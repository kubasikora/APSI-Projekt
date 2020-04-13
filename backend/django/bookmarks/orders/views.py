from rest_framework.viewsets import ModelViewSet
from .serializers import OrderSerializer
from .models import Order
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status, mixins, generics
from rest_framework.response import Response

# Create your views here.
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        serializer.save(boomer=self.request.user)

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer