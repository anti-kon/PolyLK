from django.shortcuts import render
from rest_framework.views import APIView
from .models import Persons
from .serializer import RegistrationSerializer
from rest_framework.response import Response
from django.db import *


class RegistrationView(APIView):
    def post(self, request):
        try:
            serializer = RegistrationSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                login_person = serializer.validated_data['login_person']
                password_person = serializer.validated_data['password_person']
                dorm_num_person = serializer.validated_data['dorm_num_person']
                # error 400 ???
                another_login = Persons.objects.filter(login_person=login_person)
                if another_login:
                    return Response(status=410)

                serializer.save()
                return Response(status=200)
        except IntegrityError or DatabaseError or OperationalError:
            return Response(status=503)


