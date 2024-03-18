import io
import os

from PIL import Image

from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import News
from .serializer import NewsSerializer


def delete_photo(paths_photo):
    for path in paths_photo:
        os.remove(path)

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
            text_news = request.data.get('text_new')
            paths =[]
            for image in request.FILES.getlist('list_photo_new'):
                paths.append(default_storage.save('tmp/' + image.name, ContentFile(image.read())))
            new_record = News(text_new=text_news, list_photo_new=paths)
            new_record.save()
            return Response("OK", status=200)

        except DatabaseError as e:
            return Response('Database Error', status=503)

    def delete(self, request):
        try:
            news_to_delete = News.objects.get(id_new=request.data.get('id_new'))
            delete_photo(news_to_delete.list_photo_new)
            news_to_delete.delete()

            return Response("OK", status=200)

        except News.DoesNotExist:
            return Response('The news was not found', status=404)

        except DatabaseError:
            return Response("Database Error", status=503)

    def put(self, request):
        try:
            news_to_change = News.objects.get(id_new=request.data.get('id_new'))
            text_new = request.data.get('text_new')

            new_paths = []
            for image in request.FILES.getlist('list_photo_new'):
                new_paths.append(default_storage.save('tmp/' + image.name, ContentFile(image.read())))

            if text_new != None:
                news_to_change.text_new = text_new

            if new_paths != None:
                delete_photo(news_to_change.list_photo_new)
                news_to_change.list_photo_new = new_paths

            news_to_change.save()

            serializer = NewsSerializer(news_to_change)

            return Response(serializer.data, status=200)
        except News.DoesNotExist:
            return Response('The news was not found', status=404)

        except DatabaseError:
            return Response('Database Error', status=503)
