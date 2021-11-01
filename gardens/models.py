from django.db import models
from django.conf import settings

# Create your models here.

class Garden(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=25)
    created_at = models.DateField(auto_now_add=True, null=True, blank=True)