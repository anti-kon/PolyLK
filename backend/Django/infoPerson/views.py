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
from reportlab.pdfgen import canvas
from io import BytesIO
import os

MAX_SIZE_FILE = 4096  # in bytes

class PersonsDocsView(APIView):
    def get(self, request):
        try:
            id_person = request.GET.get("id_person")
            login_person = Persons.objects.filter(id_person=id_person).values_list('login_person', flat=True).first()
            path_to_docs = f'{os.getcwd()}\\infoPerson\\docs'
            list_directory_docs =

        except DatabaseError:

    def put(self, request):
        try:
            new_login_person = request.data['login_person']
            new_password_person = request.data['password_person']
            new_dorm_num_person = request.data['dorm_num_person']

            id_person = request.data["id_person"]

            another_id_person = Persons.objects.filter(id_person=id_person)

            if not another_id_person:
                return Response(data='This user not exist', status=404)

            Persons.objects.filter(id_person=id_person).update(login_person=new_login_person,
                                                               password_person=new_password_person,
                                                               dorm_num_person=new_dorm_num_person)

            answer_data = {
                "login_person": new_login_person,
                "password_person": new_password_person,
                "dorm_num_person": new_dorm_num_person
            }
            return Response(data=answer_data, status=200)
        except DatabaseError:
            return Response(data='Database Error', status=503)

    def delete(self, request):
        try:
            id_delete_doc = request.data['id_doc']

            another_id_delete_doc = PersonsDocs.objects.filter(id_doc=id_delete_doc)

            if not another_id_delete_doc:
                return Response(data='This document not exist', status=404)

            path_to_doc = PersonsDocs.objects.filter(id_doc=id_delete_doc).values_list('path_to_doc', flat=True).first()
            os.remove(path_to_doc)
            PersonsDocs.objects.filter(id_doc=id_delete_doc).delete()
            return Response(data='OK', status=200)
        except DatabaseError:
            return Response(data='Database Error', status=503)

    def post(self, request):
        try:
            id_person_doc = request.data['id_person_doc']
            name_file = request.data['name_file']
            print(name_file)

            if (request.FILES['file'].size > (MAX_SIZE_FILE)) or (len(name_file) > 50):
                return Response(data='File or file name is too large', status=413)

            pdf_file = request.FILES['file']
            login_person = Persons.objects.filter(id_person=id_person_doc).values_list('login_person', flat=True).first()
            filename = f'{login_person}_{name_file}.pdf'
            path_to_doc = f'infoPerson\\docs\\{name_file}'
            FileSystemStorage(location=f"{os.getcwd()}\\{path_to_doc}").save(filename, pdf_file)

            data = {
                "id_person_doc": id_person_doc,
                "name_doc": f'{filename}',
                "path_to_doc": f'{path_to_doc}\\{filename}'
            }
            serializer = PersonsDocsSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(data='OK', status=200)


            # self.convert_bytes_to_file(id_person_doc, name_file, file)
            #
            # login_person = Persons.objects.filter(id_person=id_person_doc).values_list('login_person', flat=True).first()
            # path_to_doc = 'infoPerson\\docs'
            # data = {
            #     "id_person_doc": id_person_doc,
            #     "name_doc": name_file,
            #     "path_to_doc": f'{path_to_doc}\\{name_file}\\{login_person}_{name_file}.pdf'
            # }
            #
            # serializer = PersonsDocsSerializer(data=data)
            # if serializer.is_valid(raise_exception=True):
            #     serializer.save()
            #     return Response(data='OK', status=200)
        except DatabaseError:
            return Response(data='Database Error', status=503)

    # def convert_bytes_to_file(self, id_person_doc, name_file, file):
    #     file_bytes = bytes.fromhex(file.replace("0x", ""))
    #     file_pdf_buffer = BytesIO()
    #     file_pdf_canvas = canvas.Canvas(file_pdf_buffer)
    #
    #     file_pdf_canvas.drawString(100, 750, file_bytes.decode("utf-8"))
    #     file_pdf_canvas.save()
    #
    #     login_person = Persons.objects.filter(id_person=id_person_doc).values_list('login_person', flat=True).first()
    #
    #     path_to_doc = 'infoPerson\\docs'
    #     full_path = f'{os.getcwd()}\\{path_to_doc}'
    #
    #     list_directory = os.listdir(full_path)  # need for folder with name_doc
    #
    #     if name_file not in list_directory:
    #         os.mkdir(f'{full_path}\\{name_file}')
    #     full_path = f'{full_path}\\{name_file}'
    #
    #     with open(f'{full_path}\\{login_person}_{name_file}.pdf', 'wb') as f:
    #         f.write(file_pdf_buffer.getvalue())