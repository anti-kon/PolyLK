from django.shortcuts import render
from  django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
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
                return Response("The password is incorrect", status=401)

            serializer = AuthorizationSerializer(target_user)
            return Response(serializer.data, status=200)

        except Persons.DoesNotExist:
            return Response('No such login was found', status=404)

        except DatabaseError:
            return Response('Database Error', status=503)