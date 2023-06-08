from django.urls import path
from rest_framework.routers import DefaultRouter

from weather.views import *

router = DefaultRouter()

paths = [
    path('forecast/', WeatherViewSet.as_view(), name='weather'),
]

urlpatterns = router.urls + paths
