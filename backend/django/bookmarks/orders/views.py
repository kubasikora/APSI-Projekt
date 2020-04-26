from math import sqrt
from django_filters import FilterSet
from .serializers import OrderSerializer
from .models import Order
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
    serializer_class = OrderSerializer

#Wyszukuje ordersy w odleglosci przekazanej jako parametr od lokalizacji wolontariusza
class OrderInRadius(generics.ListAPIView):
    serializer_class = OrderSerializer
    lookup_url_kwarg_dist = "dist"

    def get_queryset(self):
        user = self.request.user.profile
        dist = self.kwargs.get(self.lookup_url_kwarg_dist)
        orders = Order.objects.filter(volunteer=user).values()
        coord_x_source = orders.values_list('coord_x', flat=True).last()
        coord_y_source = orders.values_list('coord_y', flat=True).last()
        orders = Order.objects.filter(coord_x__gt=coord_x_source - float(dist),
                                      coord_x__lt=coord_x_source + float(dist),
                                      coord_y__gt=coord_y_source - float(dist),
                                      coord_y__lt=coord_y_source + float(dist))
        idx = []
        for order in orders:
            coord_x_des = order.coord_x
            coord_y_des = order.coord_y
            dist_cal = sqrt((coord_x_source - coord_x_des) ** 2 + (coord_y_source - coord_y_des) ** 2)
            print(dist_cal)
            if dist_cal <= float(dist) and order.pk != int(user.pk):
                idx.append(order.pk)

        orders = Order.objects.filter(id__in=idx)
        return orders

class AssignedOrders(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    def get_queryset(self):
        user = self.request.user.profile
        return Order.objects.filter(volunteer=user, status="accepted")

class CreatedOrders(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    def get_queryset(self):
        user = self.request.user.profile
        return Order.objects.filter(boomer=user, status="created")