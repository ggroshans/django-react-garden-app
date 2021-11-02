from rest_framework import serializers
from .models import Garden, Soil

class GardenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Garden
        fields = '__all__'

class SoilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soil
        fields = ('id', 'soil_order','characteristics', 'recommendations')