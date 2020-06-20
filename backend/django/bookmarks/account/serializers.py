from rest_framework import serializers
from django.contrib.auth.models import User
from orders.models import Order
from .models import Profile
from orders.serializers import OrderSerializer



class ProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=False, read_only=True)
    # orders = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    orders = OrderSerializer(many=True, read_only=True)
    # def create(self, validated_data):
    #     user_data = validated_data.pop('user')
    #     user = UserSerializer.create(validated_data=user_data)
    #     # user = User.objects.create(**user_data)
    #     profile = Profile.objects.create(user=user, **validated_data)
    #     return profile

    class Meta:
        model = Profile
        fields = ('date_of_birth', 'user_type', 'address', 'orders', 'accumulated_rating_score', 'number_of_ratings')
        #fields = ('user_type', 'date_of_birth', 'username', 'password', 'user', 'address')
        #fields = ('user_type', 'date_of_birth', 'user', 'address')

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        Profile.objects.create(user=user, **profile_data)
        return user

    def update(self, user, validated_data):
        profile_data = validated_data.pop('profile')
        for key, value in validated_data.items():
            setattr(user, key, value)
        if 'password' in validated_data.keys():
            user.set_password(validated_data["password"])

        serializer = ProfileSerializer(user.profile, data=profile_data, partial=True)
        if serializer.is_valid():
            user.save()
            serializer.save()
        # ProfileSerializer.update(instance=user.profile, validated_data=profile_data)
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'profile')
