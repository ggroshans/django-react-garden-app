from django.shortcuts import render
from rest_framework import generics

from .models import Garden
from .serializers import GardenSerializer


# Create your views here.

class GardenListCreateAPIView(generics.ListCreateAPIView):
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    