from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import status, views
from rest_framework.response import Response
from .serializers import UserSerializer, ProfileSerializer
from rest_framework import status, generics
from django.contrib.auth.models import User
from rest_framework import generics
from .models import Profile


class LoginView(views.APIView):
    def post(self, request):
        user = authenticate(request=request, username=request.data.get("username"), password=request.data.get("password"))
        if user is None or not user.is_active:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username or password incorrect'
            }, status=status.HTTP_401_UNAUTHORIZED)
        login(request, user)
        response = Response(UserSerializer(user).data)
        response.set_cookie('username', user.get_username())
        response.set_cookie('user_type', user.profile.user_type)
        return response

class LogoutView(views.APIView):
    def get(self, request):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class MyProfile(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)
    serializer_class = UserSerializer

class MyProfile2(views.APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        me = User.objects.get(pk=request.user.pk)
        serializer = UserSerializer(me, data=request.data, partial=True)
        # serializer.update(me, request.data)
        if serializer.is_valid():
            serializer.save(save_fields=['username'])
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        me = User.objects.get(pk=request.user.pk)
        me.delete()
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)

class Rate(views.APIView):
    def put(self, request):
        rating_score = request.data.get("rating")
        id = request.data.get("id")
        print(id)
        me = User.objects.get(id=id)
        serializer = UserSerializer(me, data = {}, partial = True)
        if serializer.is_valid():
            serializer.data["profile"]["accumulated_rating_score"] += rating_score
            serializer.data["profile"]["number_of_ratings"] += 1
            serializer2 = UserSerializer(me, data=serializer.data, partial=True)
            if serializer2.is_valid():
                serializer2.save()
                return Response(serializer2.data)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)