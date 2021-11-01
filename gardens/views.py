from django.shortcuts import render
from rest_framework import generics

from .models import Garden
from .serializers import GardenSerializer


# Create your views here.

class GardenListView(generics.ListAPIView):
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer
    