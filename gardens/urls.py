from django.urls import path
from . import views

urlpatterns = [
    path("gardens/", views.GardenListCreateAPIView.as_view()),
    path("gardens/<int:pk>/", views.GardenDetailAPIView.as_view()),
    path("soils/", views.SoilListCreateAPIView.as_view()),
    ]