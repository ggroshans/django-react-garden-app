from django.urls import path
from .views import GardenListCreateAPIView, SoilListCreateAPIView

urlpatterns = [
    path("gardens/", GardenListCreateAPIView.as_view()),
    path("soils/", SoilListCreateAPIView.as_view())
    ]