import json
import jwt
import logging

import requests
from environs import Env
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response
class AuthorizationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', None)
        print(1)
        print(token)
        if token:
            response = requests.post('http://localhost:8000/verify', data={'token': token})
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
