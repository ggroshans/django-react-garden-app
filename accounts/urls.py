from django.urls import path
from .views import ProfileCreateAPIView

urlpatterns = [
    path('profile/', ProfileCreateAPIView.as_view()),
]