from django.db import models
from django.conf import settings
from django.db.models.fields import BooleanField, CharField

# Create your models here.

class Soil(models.Model):
    soil_order = models.CharField(max_length=25, null=True)
    characteristics = models.CharField(max_length=1000)
    recommendations = models.CharField(max_length=1000)

    def __str__(self):
        return self.soil_order


class Vegetable (models.Model):

    name = CharField(max_length=50, null=True)

    FULL_SUN = 'FS'
    PARTIAL_SUN = 'PS'
    BOTH = "BO"
    EXPOSURE_CHOICES = [
        (FULL_SUN, 'FS'),
        (PARTIAL_SUN, 'PS'),
        (BOTH, 'BO'),
    ]
    exposure = models.CharField(max_length=4, choices=EXPOSURE_CHOICES)

    heat_tolerant = BooleanField()
    drought_tolerant = BooleanField()

    ANNUAL = 'AN'
    BIENNIAL = 'BI'
    PERENIAL = 'PE'
    LIFE_CYCLE_CHOICES = [
        (ANNUAL, 'AN'),
        (BIENNIAL, 'BI'),
        (PERENIAL, 'PE'),
    ]
    life_cycle = models.CharField(max_length=4, choices=LIFE_CYCLE_CHOICES)

    COOL_SEASON = 'CS'
    WARM_SEASON = 'WS'
    SEASONALITY_CHOICES = [
        (COOL_SEASON, 'CS'),
        (WARM_SEASON, 'WS'),
    ]
    seasonality = models.CharField(max_length=4, choices=SEASONALITY_CHOICES)
    companions = models.JSONField(null=True, blank=True)
    adversaries = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name



class Garden(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=25)
    created_at = models.DateField(auto_now_add=True, null=True, blank=True)
    soil = models.ForeignKey(Soil, on_delete=models.CASCADE, null=True)
    vegetables = models.ManyToManyField(Vegetable, related_name="vegetables")
    layout = models.ImageField(upload_to="layouts/", null=True)

    def __str__(self):
        return self.name