import json

import requests
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView

from weather.helpers import WEATHER_SERVICE_URL


# Create your views here.
class WeatherViewSet(APIView):

    def get(self, request):
        try:
            data = self.request.query_params
            city = data.get('city')
            response = {}
            three_days = requests.get(f'{WEATHER_SERVICE_URL}&q={city}&format=json&num_of_days=3')
            r_status = three_days.status_code
            if r_status == 200:
                response['three_days'] = three_days.json()
            five_days = requests.get(f'{WEATHER_SERVICE_URL}&q={city}&format=json&num_of_days=5')
            r_status = three_days.status_code
            if r_status == 200:
                response['five_days'] = five_days.json()

            return JsonResponse({'data': response})
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


