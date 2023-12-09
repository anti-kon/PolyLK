import json

from django.shortcuts import render
from rest_framework.views import APIView
from .models import Persons
from .serializer import RegistrationSerializer
from rest_framework.response import Response
from django.db import *
import re


class RegistrationView(APIView):
    def post(self, request):
        try:
            serializer = RegistrationSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                login_person = serializer.validated_data['login_person']
                password_person = serializer.validated_data['password_person']
                dorm_num_person = serializer.validated_data['dorm_num_person']

                if not self.is_correct_password(password_person):
                    return Response(status=400)
                another_login = Persons.objects.filter(login_person=login_person)
                if another_login:
                    return Response(status=410)  #переделать http на 409

                serializer.save()
                return Response(status=200)
        except DatabaseError:
            return Response(status=503)

    def is_correct_password(self, input_password: str):
        lowercase_letters = [letter for letter in input_password if letter.islower()]
        uppercase_letters = [letter for letter in input_password if letter.isupper()]
        numbers = [number for number in input_password if number.isnumeric()]

        return len(input_password) >= 8 and \
               lowercase_letters and \
               uppercase_letters and \
               numbers
