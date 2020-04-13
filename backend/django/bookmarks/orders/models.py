from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Order(models.Model):
    description = models.CharField(max_length=1024)
    boomer = models.ForeignKey(User, related_name='orders',
                               on_delete=models.SET_NULL, null=True)
    volunteer = models.ForeignKey(User, related_name='tasks',
                                  on_delete=models.SET_NULL, null=True, blank=True)