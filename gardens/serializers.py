from rest_framework import serializers
from .models import Garden, Soil

class GardenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Garden
        fields = ('name', 'user', 'created_at',)

class SoilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soil
        fields = ('soil_order','characteristics', 'recommendations')