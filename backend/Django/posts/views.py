import json

from django.shortcuts import render
from rest_framework.views import APIView
from .models import Persons, Ads
from .serializer import PostsSerializer
from rest_framework.response import Response
from django.db import *



class PostsView(APIView):
    def post(self, request):
        try:
            serializer = PostsSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                dorm_num_ads = serializer.validated_data['dorm_num_ads']
                info_ads = serializer.validated_data['info_ads']
                price_ads = serializer.validated_data['price_ads']
                alternative_payment_ads = serializer.validated_data['alternative_payment_ads']
                # list_photo_ads = serializer.validated_data['list_photo_ads'] # разобрать с фотографиями
                id_person_ads = serializer.validated_data['id_person_ads']

                serializer.save()
                return Response(status=200)
        except DatabaseError:
            return Response(status=503)

    def get(self, request):
        try:
            dorm_num_ads = request.GET.get('dorm_num_ads')
            info_ads = request.GET.get('info_ads')
            price_ads = request.GET.get('price_ads')
            alternative_payment_ads = request.GET.get('alternative_payment_ads')
            list_photo_ads = request.GET.get('list_photo_ads')
            id_person_ads = request.GET.get('id_person_ads')

        # except ObjectDoesNotExist:
        #     print("Объект не сушествует")
        # except MultipleObjectsReturned:
        #     print("Найдено более одного объекта")

            return Response(status=200)
        except DatabaseError:
            return Response(status=503)

    def delete(self, request):
        try:
            serializer = PostsSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                id_delete = serializer.validated_data['id_ads']
                id_ads = Ads.objects.filter(id_ads=id_delete)
                if id_ads:
                    id_ads.delete()
                    return Response(status=200)
                else:
                    return Response(status=404)
        except DatabaseError:
            return Response(status=503)





