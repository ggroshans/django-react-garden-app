from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics

from .models import Garden, Soil
from .serializers import GardenSerializer, SoilSerializer


# Create your views here.

class GardenListCreateAPIView(generics.ListCreateAPIView):
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SoilListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = SoilSerializer

    def get_queryset(self):

        queryset = Soil.objects.all()
        soil_order = self.request.query_params.get('soil')
        if soil_order is not None:
            queryset = queryset.filter(soil_order=soil_order)
        return queryset