import os
import requests
from django.http import HttpResponse

class AuthorizationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', None)
        print(1)
        print(token)
        if token:
            response = requests.post(f"http://"
                                     f"{os.environ.get('POLYLK_API_GATEWAY_HOSTNAME')}:"
                                     f"{os.environ.get('POLYLK_API_GATEWAY_PORT')}/"
                                     f"{os.environ.get('POLYLK_AUTHORIZATION_HOSTNAME')}/"
                                     f"verify/", data={'token': token})
            print(response)
            print(2)
            if response.status_code == 200:
                print(3)
                return self.get_response(request)
            else:
                print(4)
                return HttpResponse(response, status=response.status_code)
        print(5)
        return HttpResponse('Токен не найден', status=401)