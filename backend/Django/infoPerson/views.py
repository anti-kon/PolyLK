import json

from django.shortcuts import render
from rest_framework.views import APIView
from .models import PersonsDocs
from .models import Persons
from .serializer import PersonsDocsSerializer
from rest_framework.response import Response
from django.db import *
from reportlab.pdfgen import canvas
from io import BytesIO
import os

MAX_SIZE_FILE = 4096  # in bytes

class PersonsDocsView(APIView):
    def post(self, request):
        try:
            id_person_doc = request.data['id_person_doc']
            name_file = request.data['name_file']
            file = request.data['file']
            print(id_person_doc)
            print(name_file)
            print(file)

            if (len(file) > (MAX_SIZE_FILE / 4)) or (len(name_file) > 50):
                return Response(data='File or file name is too large', status=413)

            file_bytes = bytes.fromhex(file.replace("0x", ""))
            file_pdf_buffer = BytesIO()
            file_pdf_canvas = canvas.Canvas(file_pdf_buffer)

            file_pdf_canvas.drawString(100, 750, file_bytes.decode("utf-8"))
            file_pdf_canvas.save()

            login_person = Persons.objects.filter(id_person=id_person_doc).values_list('login_person', flat=True).first()
            print(login_person)

            path_to_doc = 'infoPerson\\docs'
            full_path = f'{os.getcwd()}\\{path_to_doc}'
            with open(f'{full_path}\\{login_person}_{name_file}.pdf', 'wb') as f:
                f.write(file_pdf_buffer.getvalue())

            data = {
                "id_person_doc": id_person_doc,
                "name_doc": name_file,
                "path_to_doc": path_to_doc
            }

            serializer = PersonsDocsSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(data='OK', status=200)
        except DatabaseError:
            return Response(data='Database Error', status=503)

