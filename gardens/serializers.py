from rest_framework import serializers
from .models import Garden, Soil, Vegetable

class SoilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soil
        fields = ('id', 'soil_order','characteristics', 'recommendations')

class VegetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vegetable
        fields = '__all__'


class GardenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    vegetables_details = VegetableSerializer(many=True, read_only=True, source="vegetables")

    class Meta:
        model = Garden
        fields = '__all__'