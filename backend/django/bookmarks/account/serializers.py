from rest_framework import serializers
from django.contrib.auth.models import User
from orders.models import Order

class UserSerializer(serializers.ModelSerializer):
    orders = serializers.PrimaryKeyRelatedField(many=True, queryset=Order.objects.all())
    class Meta:
        model = User
        fields = ('id', 'username', 'orders')
