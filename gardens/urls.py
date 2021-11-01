from django.urls import path
from .views import GardenListCreateAPIView

urlpatterns = [
    path("gardens/", GardenListCreateAPIView.as_view())
    ]