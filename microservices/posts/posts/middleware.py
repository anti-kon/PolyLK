import requests
from django.http import HttpResponse


class AuthorizationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', None)
        if token:
            response = requests.post('http://localhost:8002/verify/', data={'token': token})
            if response.status_code == 200:
                return self.get_response(request)
            else:
                return HttpResponse(response, status=response.status_code)
        return HttpResponse('Токен не найден', status=401)
