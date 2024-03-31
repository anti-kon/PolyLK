import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import *
from .models import Persons
from .serializer import AuthorizationSerializer
import jwt
import json
import jwt
import logging
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response


SECRET_KEY = "PolyLK"


class AuthorizationView(APIView):

    def get(self, request):
        try:
            login = request.GET.get('login')
            password = request.GET.get('password')

            target_user = Persons.objects.get(login_person=login)

            if target_user.password_person != password:
                return Response("Неверный пароль", status=401)

            serializer = AuthorizationSerializer(target_user)
            response_data = serializer.data.copy()
            #response_data["token"] = serializer.data.get('id_person')
            response_data["token"] = jwt.encode({"id_person": serializer.data.get('id_person'), "login_person": serializer.data.get('login_person'),
                                                 "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(seconds=30)}, "PolyLK", algorithm="HS256")
            return Response(response_data, status=200)

        except Persons.DoesNotExist:
            return Response('Пользователь не существует', status=404)

        except DatabaseError:
            return Response('База данных не отвечает', status=503)

class CustomMiddleware(APIView):

    """
    Custom Middleware Class to process a request before it reached the endpoint
    """

    def post(self, request):

        """
        Custom middleware handler to check authentication for a user with JWT authentication
        :param request: Request header containing authorization tokens
        :type request: Django Request Object
        :return: HTTP Response if authorization fails, else None
        """
        print(request)
        jwt_token = request.data.get('token', None)
        print(1)
        print(jwt_token)
        # return None
        # logger.info(f"request received for endpoint {str(request.path)}")

        # If token Exists
        if jwt_token:
            try:
                print(2)
                payload = jwt.decode(jwt_token.split(' ')[1], SECRET_KEY, algorithms=['HS256'])
                id_person = payload['id_person']
                login_person = payload['login_person']
                print(payload)
                # logger.info(f"Request received from user - {userid}, company - {company_id}")
                return Response('OK', status=200)
            except jwt.ExpiredSignatureError:
                print(3)
                return Response('Истек срок токена', status=401)  # посмотреть код ошибки
            except (jwt.DecodeError, jwt.InvalidTokenError):
                print(4)
                return Response('Неверный токен', status=401)
        else:
            # response = create_response(
            #     "", 401, {"message": "Authorization not found, Please send valid token in headers"}
            # )
            # #logger.info(f"Response {response}")
            # return HttpResponse(json.dumps(response), status=401)

            print(5)
            return Response('Пользователь не авторизован', status=401)
