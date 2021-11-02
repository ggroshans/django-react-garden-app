from django.contrib import admin
from .models import Garden, Soil, Vegetable

# Register your models here.

admin.site.register(Garden)
admin.site.register(Soil)
admin.site.register(Vegetable)