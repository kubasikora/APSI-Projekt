from django.db import models
from account.models import Profile
from django.contrib.auth.models import User

STATUS_CHOICES = [
    ("created", "created"),
    ("accepted", "accepted"),
    ("done", "done"),
]

# Create your models here.
class Order(models.Model):
    description = models.CharField(max_length=1024)
    boomer = models.ForeignKey(Profile, related_name='orders',
                               on_delete=models.SET_NULL, null=True)
    volunteer = models.ForeignKey(Profile, related_name='tasks',
                                  on_delete=models.SET_NULL, null=True, blank=True)
    coord_x = models.FloatField(default=0)
    coord_y = models.FloatField(default=0)
    status = models.CharField(max_length=32, choices = STATUS_CHOICES, default ='created')

class Product(models.Model):
    name = models.CharField(max_length=32)
    productType = models.CharField(max_length=32)
    countity = models.FloatField(default=0)
    price = models.FloatField(default=0)
    order = models.ForeignKey(Order, related_name='products', on_delete=models.CASCADE)
    isBought = models.BooleanField(default=False)