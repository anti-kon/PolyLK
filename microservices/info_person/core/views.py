import json

from django.shortcuts import render
from rest_framework.views import APIView
from .models import PersonsDocs
from .models import Persons
from .serializer import PersonsDocsSerializer
from .serializer import RegistrationSerializer
from rest_framework.response import Response
from django.core.files.storage import FileSystemStorage
from django.core.files.base import ContentFile
from django.db import *
import os

MAX_SIZE_FILE = 4096  # in bytes

class PersonsDocsView(APIView):
    def get(self, request):
        try:
            id_person = request.GET.get("id_person")
            login_person = Persons.objects.filter(id_person=id_person).values_list('login_person', flat=True).first()
            path_to_docs = f'.\\..\\..\\frontend\\public\\infoPerson\\docs'
            list_directory_docs = os.listdir(path_to_docs)

            docs_list = []

            for directory in list_directory_docs:
                list_directory_files = os.listdir(f'{path_to_docs}\\{directory}')
                for file in list_directory_files:
                    if login_person in file:
                        id_doc = PersonsDocs.objects.filter(name_doc=file).values_list('id_doc', flat=True).first()
                        path_to_doc = f'infoPerson\\docs\\{directory}\\{file}'

                        response_dict = {
                            "id_doc": id_doc,
                            "id_person": int(id_person),
                            "name_doc": file,
                            "path_to_doc": path_to_doc
                        }

                        docs_list.append(response_dict)

            response_data = {
                "docs_list": docs_list
            }
            return Response(data=response_data, status=200)
        except DatabaseError:
            return Response(data='База данных не отвечает', status=503)

    def put(self, request):
        try:
            new_login_person = request.data['login_person']
            new_password_person = request.data['password_person']
            new_dorm_num_person = request.data['dorm_num_person']

            id_person = request.data["id_person"]

            another_id_person = Persons.objects.filter(id_person=id_person)

            if not another_id_person:
                return Response(data='Этот пользователь не существует', status=404)

            Persons.objects.filter(id_person=id_person).update(login_person=new_login_person,
                                                               password_person=new_password_person,
                                                               dorm_num_person=new_dorm_num_person)

            answer_data = {
                "id_person": id_person,
                "login_person": new_login_person,
                "password_person": new_password_person,
                "dorm_num_person": new_dorm_num_person
            }
            return Response(data=answer_data, status=200)
        except DatabaseError:
            return Response(data='База данных не отвечает', status=503)

    def delete(self, request):
        try:
            id_delete_doc = request.data['id_doc']

            another_id_delete_doc = PersonsDocs.objects.filter(id_doc=id_delete_doc)

            if not another_id_delete_doc:
                return Response(data='Этого документа не существует', status=404)

            path_to_doc = PersonsDocs.objects.filter(id_doc=id_delete_doc).values_list('path_to_doc', flat=True).first()
            os.remove(path_to_doc)
            PersonsDocs.objects.filter(id_doc=id_delete_doc).delete()
            return Response(data='OK', status=200)
        except DatabaseError:
            return Response(data='База данных не отвечает', status=503)

    def post(self, request):
        try:
            id_person = request.data['id_person']
            name_file = request.data['name_file']
            print(name_file)

            if (request.FILES['file'].size > (MAX_SIZE_FILE)) or (len(name_file) > 50):
                return Response(data='Файл или его имя слишком большие.', status=413)

            pdf_file = request.FILES['file']
            login_person = Persons.objects.filter(id_person=id_person).values_list('login_person', flat=True).first()
            filename = f'{login_person}_{name_file}.pdf'
            path_to_doc = f'.\\..\\..\\frontend\\public\\infoPerson\\docs\\{name_file}'
            FileSystemStorage(location=f"{path_to_doc}").save(filename, pdf_file)

            data = {
                "id_person": id_person,
                "name_doc": f'{filename}',
                "path_to_doc": f'{path_to_doc}\\{filename}'
            }
            serializer = PersonsDocsSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(data='OK', status=200)

        except DatabaseError:
            return Response(data='База данных не отвечает', status=503)
