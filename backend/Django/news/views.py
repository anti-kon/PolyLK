from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import *
from .models import News
from .serializer import NewsSerializer


class NewsView(APIView):
    def get(self, request):
        try:
            news = News.objects.all()
            serializer = NewsSerializer(instance=news, many=True)

            return Response(serializer.data, status=200)
        except DatabaseError:
            return Response('Database Error', status=503)

    def post(self, request):
        try:
            text_news = request.data['text_new']
            list_photo_news = request.data['list_photo_new']

            new_record = News(text_news=text_news, list_photo_new= list_photo_news);

            new_record.save()

        except DatabaseError:
            return Response('Database Error', status=503)