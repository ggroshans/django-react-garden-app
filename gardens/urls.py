from django.urls import path
from .views import GardenListView

urlpatterns = [
    path("gardens/", GardenListCreateView.as_view())
    ]