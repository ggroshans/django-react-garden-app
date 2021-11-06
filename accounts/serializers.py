from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from rest_auth.serializers import UserDetailsSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Profile
        fields = ('user', 'avatar', 'display_name')

class UserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ('id', 'username', 'email', 'is_active', 'is_staff', 'is_superuser',)