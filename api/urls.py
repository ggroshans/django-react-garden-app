from django.urls import path, include

urlpatterns = [
    path("", include('gardens.urls')),
]