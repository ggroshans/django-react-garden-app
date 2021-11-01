from django.db import models
from django.conf import settings

# Create your models here.

class Garden(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=25)
    date = models.DateField(auto_now_add=True)