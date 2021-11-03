from django.conf import settings
from django.db.models import query
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics

from .models import Garden, Soil, Vegetable
from .serializers import GardenSerializer, SoilSerializer, VegetableSerializer


# Create your views here.

class GardenListCreateAPIView(generics.ListCreateAPIView):
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer

    def get_queryset(self):
        current_user = settings.request.user
        return Garden.objects.all(user=current_user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GardenDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer

class SoilListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = SoilSerializer

    def get_queryset(self):

        queryset = Soil.objects.all()
        soil_order = self.request.query_params.get('soil')
        if soil_order is not None:
            queryset = queryset.filter(soil_order=soil_order)
        return queryset

class VegetableListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = VegetableSerializer

    def get_queryset(self):
        queryset = Vegetable.objects.all()

        name = self.request.query_params.get('name')
        exposure = self.request.query_params.get('exposure')
        heat_tolerant = self.request.query_params.get('heat_tolerant')
        drought_tolerant = self.request.query_params.get('drought_tolerant')
        life_cycle = self.request.query_params.get('life_cycle')
        seasonality = self.request.query_params.get('seasonality')

        if name is not None:
            queryset = queryset.filter(name=name)
        if exposure is not None:
            queryset = queryset.filter(exposure=exposure)
        if heat_tolerant is not None:
            queryset = queryset.filter(heat_tolerant=heat_tolerant)
        if drought_tolerant is not None:
            queryset = queryset.filter(drought_tolerant=drought_tolerant)
        if life_cycle is not None:
            queryset = queryset.filter(life_cycle=life_cycle)
        if seasonality is not None:
            queryset =  queryset.filter(seasonality=seasonality)
        return queryset