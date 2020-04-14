from .serializers import OrderSerializer
from .models import Order
from rest_framework import generics

# Create your views here.
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        try:
            profile = self.request.user.profile
        except:
            raise ValueError('user {} does not have a profile'.format(self.request.user.get_username()))
        serializer.save(boomer=self.request.user.profile)

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer