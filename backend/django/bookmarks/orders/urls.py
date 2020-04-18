from django.conf.urls import url
from .views import OrderList, OrderDetail, OrderInRadius
from django.urls import path


urlpatterns = [path('', OrderList.as_view()),
               path('<int:pk>', OrderDetail.as_view()),
               path('<int:pk>-<dist>/', OrderInRadius.as_view())]