import io
import os

from PIL import Image

from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import *
from .models import News
from .serializer import NewsSerializer


def delete_photo(paths_photo):
    for path in paths_photo:
        os.remove(path)


def upload_photo(binary_photos, text_news):
    path_photo_news = []
    for i, byte_img in enumerate(binary_photos):
        im = Image.open(io.BytesIO(byte_img))
        # Подумать насчет индексикации фотографии
        im.save(f'news/img/{text_news[:10]}_{i}.png')
        path_photo_news.append(f'news/img/{text_news[:10]}_{i}.png')
    return path_photo_news


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
            list_photo_news = request.data.get('list_photo_new')
            new_record = News(text_new=text_news, list_photo_new=upload_photo(list_photo_news, text_news))

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
            list_photo_new = request.data.get('list_photo_new')

            if text_new != None:
                news_to_change.text_new = text_new

            if list_photo_new != None:
                delete_photo(news_to_change.list_photo_new)
                news_to_change.list_photo_new = upload_photo(list_photo_new, news_to_change.list_photo_new)

            news_to_change.save()

            serializer = NewsSerializer(news_to_change)

            return Response(serializer.data, status=200)
        except News.DoesNotExist:
            return Response('The news was not found', status=404)

        except DatabaseError:
            return Response('Database Error', status=503)
