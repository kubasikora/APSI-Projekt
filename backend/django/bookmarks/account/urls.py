from django.conf.urls import url
from .views import LoginView, LogoutView, UserList, ProfileList
from rest_framework.routers import DefaultRouter
from django.urls import path


urlpatterns = [path(r'login', LoginView.as_view()),
               path(r'logout', LogoutView.as_view()),
               path('users', UserList.as_view()),
               path('profiles', ProfileList.as_view()),]