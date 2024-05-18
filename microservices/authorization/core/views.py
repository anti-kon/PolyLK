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
    def check_token(self, id_person):
        target_user = Persons.objects.get(id_person=id_person)
        token_array = target_user.remember_me_person
        for token in token_array:
            try:
                jwt.decode(token, SECRET_KEY, algorithms=ENCRYPTION_ALGORITHM)
            except jwt.ExpiredSignatureError:
                token_array.remove(token)
                continue
            except (jwt.DecodeError, jwt.InvalidTokenError):
                token_array.remove(token)
                continue
        target_user.remember_me_person = token_array
        target_user.save()
        serializer = AuthorizationSerializer(target_user)

    def get(self, request):
        print("!")
        try:
            login = request.GET.get('login')
            password = request.GET.get('password')
            remember_me = request.COOKIES.get('remember_me')

            print(remember_me)

            target_user = []
            if remember_me != 'true' and remember_me != '':
                target_user = Persons.objects.get(id_person=jwt.decode(remember_me, SECRET_KEY,
                                                                       algorithms=ENCRYPTION_ALGORITHM)['sub'])
            else:
                target_user = Persons.objects.get(login_person=login)
            print("1")
            if remember_me == 'true' or remember_me != '':
                self.check_token(target_user.id_person)
            print("2")
            if remember_me != 'true' and remember_me != '':
                if remember_me not in target_user.remember_me_person:
                    return Response('Токен не существует', status=403)
            else:
                if target_user.password_person != password:
                    return Response("Неверный пароль", status=401)
            print("3")
            serializer = AuthorizationSerializer(target_user)
            response_data = serializer.data.copy()
            response_data["token"] = jwt.encode({"sub": serializer.data.get('id_person'),
                                                 "login": serializer.data.get('login_person'),
                                                 "exp": (datetime.datetime.now(tz=datetime.timezone.utc) +
                                                         datetime.timedelta(seconds=300))},
                                                SECRET_KEY, algorithm=ENCRYPTION_ALGORITHM)

            remember_me_token = jwt.encode({"sub": serializer.data.get('id_person'),
                                            "exp": (datetime.datetime.now(tz=datetime.timezone.utc) +
                                                    datetime.timedelta(days=10))},
                                            SECRET_KEY, algorithm=ENCRYPTION_ALGORITHM)
            print("4")
            access_response = Response(response_data, status=200)
            access_response.set_cookie('set_remember_me', remember_me_token)
            print("5")
            return access_response


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

                target_user = Persons.objects.get(id_person=id_person)

                if target_user.login_person != login_person:
                    return Response('Неверный токен', status=401)
                return Response('OK', status=200)
            except jwt.ExpiredSignatureError:
                return Response('Истек срок токена', status=401)
            except (jwt.DecodeError, jwt.InvalidTokenError):
                return Response('Неверный токен', status=401)
        else:
            return Response('Пользователь не авторизован', status=401)
