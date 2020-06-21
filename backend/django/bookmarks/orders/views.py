import math
from math import sqrt
from django_filters import FilterSet
from rest_framework.response import Response

from .serializers import OrderSerializer, BasicOrderSerializer,ProductSerializer,LimitedProductSerializer, OrderWithBoomerSerializer
from .models import Order, Product
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters import rest_framework as filters

class OrderFilter(FilterSet):
    coord_x = filters.CharFilter('coord_x')
    coord_y = filters.CharFilter('coord_y')
    status = filters.CharFilter('status')
    min_coordx = filters.CharFilter(method="filter_min_coordx")
    max_coordx = filters.CharFilter(method="filter_max_coordx")
    min_coordy = filters.CharFilter(method="filter_min_coordy")
    max_coordy = filters.CharFilter(method="filter_max_coordy")

    class Meta:
        model = Order
        fields = ('coord_x','coord_y',)

    def filter_min_coordx(self, queryset, name, value):
        queryset = queryset.filter(coord_x__gt=value)
        return queryset

    def filter_max_coordx(self, queryset, name, value):
        queryset = queryset.filter(coord_x__lt=value)
        return queryset

    def filter_min_coordy(self, queryset, name, value):
        queryset = queryset.filter(coord_y__gt=value)
        return queryset

    def filter_max_coordy(self, queryset, name, value):
        queryset = queryset.filter(coord_y__lt=value)
        return queryset


# Create your views here.
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    filter_class = OrderFilter
    filter_fields = ('coord_x','coord_y','status',)
    ordering_fields = ('coord_x','coord_y',)
    ordering = ('id','coord_x','coord_y',)
    search_fields = ('coord_x','coord_y',)

    def perform_create(self, serializer):
        try:
            profile = self.request.user.profile
        except:
            raise ValueError('user {} does not have a profile'.format(self.request.user.get_username()))
        serializer.save(boomer=self.request.user.profile)

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = BasicOrderSerializer

class ProductDetailChecker(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = LimitedProductSerializer

class ProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    lookup_url_kwarg_orderPk = "orderPK"
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['productType']
    def get_queryset(self):
        orderPK = self.kwargs.get(self.lookup_url_kwarg_orderPk)
        productList = Product.objects.filter(order__in=orderPK)
        return productList
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        results = Product.objects.all()
        output_serializer = ProductSerializer(results, many=True)
        data = output_serializer.data[:]
        return Response(data)

class ProductListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_url_kwarg_orderPk = "orderPK"
    lookup_url_kwarg_PK = "pk"
    def get_queryset(self):
        orderPK = self.kwargs.get(self.lookup_url_kwarg_orderPk)
        productPK = self.kwargs.get(self.lookup_url_kwarg_PK)
        product = Product.objects.filter(id__in=productPK, order__in=orderPK)
        return product

#Wyszukuje ordersy w odleglosci przekazanej jako parametr od lokalizacji wolontariusza
class OrderInRadius(generics.ListAPIView):
    serializer_class = OrderSerializer
    lookup_url_kwarg_coordx = "coordx"
    lookup_url_kwarg_coordy = "coordy"
    lookup_url_kwarg_dist = "dist"
    R = 6378.1  # Radius of the Earth
    brng = 1.57  # Bearing is 90 degrees converted to radians.

    def get_queryset(self):
        user = self.request.user.username
        coordx = float(self.kwargs.get(self.lookup_url_kwarg_coordx))
        coordy = float(self.kwargs.get(self.lookup_url_kwarg_coordy))
        dist = float(self.kwargs.get(self.lookup_url_kwarg_dist))

        lat1 = math.radians(coordx)
        lon1 = math.radians(coordy)

        lat2 = math.asin(math.sin(lat1) * math.cos(dist / self.R) +
                         math.cos(lat1) * math.sin(dist / self.R) * math.cos(self.brng))

        lon2 = lon1 + math.atan2(math.sin(self.brng) * math.sin(dist / self.R) * math.cos(lat1),
                                 math.cos(dist / self.R) - math.sin(lat1) * math.sin(lat2))

        lat2 = math.degrees(lat2)
        lon2 = math.degrees(lon2)
        radius = sqrt((lat2 - coordx)**2 + (lon2 - coordy)**2)
        orders = Order.objects.filter(coord_x__gt=coordx - radius,
                                      coord_x__lt=coordx + radius,
                                      coord_y__gt=coordy - radius,
                                      coord_y__lt=coordy + radius)
        idx = []
        for order in orders:
            coord_x_des = order.coord_x
            coord_y_des = order.coord_y
            dist_cal = sqrt((coordx - coord_x_des) ** 2 + (coordy - coord_y_des) ** 2)
            if dist_cal <= radius and order.volunteer != str(user):
                idx.append(order.pk)

        orders = Order.objects.filter(id__in=idx,status="created")
        return orders

class AssignedOrders(generics.ListCreateAPIView):
    serializer_class = OrderWithBoomerSerializer
    def get_queryset(self):
        user = self.request.user.profile
        return Order.objects.filter(volunteer=user, status="accepted") | Order.objects.filter(volunteer=user, status="done")

class CreatedOrders(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    def get_queryset(self):
        user = self.request.user.profile
        return Order.objects.filter(boomer=user, status="created") | Order.objects.filter(boomer=user,status="accepted")

class DoneOrders(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    def get_queryset(self):
        user = self.request.user.profile
        return Order.objects.filter(boomer=user, status__in=["done", "finished"])