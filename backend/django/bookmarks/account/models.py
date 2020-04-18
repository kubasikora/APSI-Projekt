from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    photo = models.ImageField(upload_to='users/%Y/%m/%d/', blank=True)
    user_type = models.TextField(max_length=64)
    def __str__(self):
        return 'Profile for user {}'.format(self.user.get_username)
# Create your models here.
