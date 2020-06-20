from rest_framework import serializers
from .models import Order, Product
from django.contrib.auth.models import User

class OrderSerializer(serializers.ModelSerializer):
    # Jesli chcemy zwrocic przetworzone dane z bazy to robimy to w ten sposob:
    # tworzenie zmiennej boomer tutaj i zamiana jej wartosci na nazwe uztykownika (a nie id uzytkownika)
    #boomer = serializers.ReadOnlyField(source='boomer.user.username')
    class Meta:
        model = Order
        #fields = ('id','coord_x', 'coord_y', 'description', 'boomer', 'volunteer')
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'