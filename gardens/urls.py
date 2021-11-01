from django.urls import path
from .views import GardenListView

urlpatterns = [
    path("gardens/", GardenListView.as_view())
    ]