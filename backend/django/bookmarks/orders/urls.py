from django.conf.urls import url
from .views import OrderList, OrderDetail, OrderInRadius, AssignedOrders, CreatedOrders
from django.urls import path


urlpatterns = [path('', OrderList.as_view()),
               path('<int:pk>', OrderDetail.as_view()),
               path('orderInRadius_<coordx>_<coordy>_<dist>/', OrderInRadius.as_view()),
               path('createdOrders', CreatedOrders.as_view()),
               path('assignedOrders', AssignedOrders.as_view())]