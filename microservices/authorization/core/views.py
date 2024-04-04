import datetime
import os
from rest_framework.views import APIView
from django.db import *
from .models import Persons
from .serializer import AuthorizationSerializer
import jwt
from rest_framework.response import Response

SECRET_KEY = os.environ.get('POLYLK_AUTHORIZATION_SECRET_KEY')
ENCRYPTION_ALGORITHM = os.environ.get('POLYLK_AUTHORIZATION_ENCRYPTION_ALGORITHM')


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
            response_data["token"] = jwt.encode({"sub": serializer.data.get('id_person'),
                                                 "login": serializer.data.get('login_person'),
                                                 "exp": (datetime.datetime.now(tz=datetime.timezone.utc) +
                                                         datetime.timedelta(seconds=300))},
                                                SECRET_KEY, algorithm=ENCRYPTION_ALGORITHM)
            return Response(response_data, status=200)

        except Persons.DoesNotExist:
            return Response('Пользователь не существует', status=404)

        except DatabaseError:
            return Response('База данных не отвечает', status=503)


class TokenView(APIView):

    def post(self, request):
        jwt_token = request.data.get('token', None)

        if jwt_token:
            try:
                payload = jwt.decode(jwt_token.split(' ')[1], SECRET_KEY, algorithms=ENCRYPTION_ALGORITHM)
                id_person = payload['sub']
                login_person = payload['login']
                # TODO fix check id_person and login_person in database
                return Response('OK', status=200)
            except jwt.ExpiredSignatureError:
                return Response('Истек срок токена', status=401)
            except (jwt.DecodeError, jwt.InvalidTokenError):
                return Response('Неверный токен', status=401)
        else:
            return Response('Пользователь не авторизован', status=401)
