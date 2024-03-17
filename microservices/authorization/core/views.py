from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import *
from .models import Persons
from .serializer import AuthorizationSerializer


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
            response_data["token"] = 210
            return Response(response_data, status=200)

        except Persons.DoesNotExist:
            return Response('Пользователь не существует', status=404)

        except DatabaseError:
            return Response('База данных не отвечает', status=503)

