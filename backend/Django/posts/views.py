import json

from django.shortcuts import render
from rest_framework import status
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
            if price_ads < 0:
                return Response({'error': 'Invalid price'}, status=400)
            alternative_payment_ads = serializer.validated_data['alternative_payment_ads']
            id_person_ads = serializer.validated_data['id_person_ads']

            list_photo_news = request.data.get('list_photo_news')
            path_photo_news = []

            for i, byte_img in enumerate(list_photo_news):
                im = Image.open(io.BytesIO(byte_img))
                im.save(f'posts/img_user/{info_ads[:10]}_{i}.png')
                path_photo_news.append(f'posts/img_user/{text_news[:10]}_{i}.png')
            serializer.save()

            return Response(status=200)
    except DatabaseError:
        return Response({'error': 'Database not responding'}, status=503)

    # try:
    #     dorm_num_ads = request.data.get('dorm_num_ads')
    #     info_ads = request.data.get('info_ads')
    #     price_ads = request.data.get('price_ads')
    #     if price_ads < 0:
    #         return Response({'error': 'Invalid price'}, status=400)
    #     alternative_payment_ads = request.data.get('alternative_payment_ads')
    #     id_person_ads = request.data.get('id_person_ads')
    #
    #     list_photo_news = request.data.get('list_photo_news')
    #     path_photo_news = []
    #
    #     for i, byte_img in enumerate(list_photo_news):
    #         im = Image.open(io.BytesIO(byte_img))
    #         im.save(f'posts/img_user/{info_ads[:10]}_{i}.png')
    #         path_photo_news.append(f'posts/img_user/{text_news[:10]}_{i}.png')
    #     serializer.save()
    #     return Response(status=200)
    # except DatabaseError:
    #     return Response({'error': 'Database not responding'}, status=503)


def get(self, request, *args, **kwargs):

    dorm_num_ads = self.request.query_params.get('dorm_num_ads')
    try:
        queryset = Ads.objects.all()
        if dorm_num_ads:
         queryset = queryset.filter(dorm_num_ads=dorm_num_ads)
         response_list = []
         for ads in queryset:
            id_person = ads.values_list("id_person_ads", flat=True).first()
            id_ads = ads.values_list("id_ads", flat=True).first()
            info_ads = ads.values_list("info_ads", flat=True).first()
            price_ads = ads.values_list("price_ads", flat=True).first()
            alternative_payment_ads = ads.values_list("alternative_payment_ads", flat=True).first()
            id_person_ads = ads.values_list("id_person_ads", flat=True).first()
            userLogin = Persons.objects.filter(id_person=id_person).values_list("login_person", flat=True).first()
            data_ads = {
                "id_ads": id_ads,
                "info_ads": info_ads,
                "price_ads": price_ads,
                "alternative_payment_ads": alternative_payment_ads,
                # "list_photo_ads": ,
                "id_persons_ads": id_person_ads,
                "login_persons_ads": userLogin,
            }
            response_list.append(data_ads)
        serializer = PostsSerializer(queryset, many=True)
        return Response(serializer.data, status=200)
    except DatabaseError:
        return Response(status=503)

def put(self, request, *args, **kwargs):
    try:
        instance_id = self.request.query_params.get('id_ads')

        if not instance_id:
            return Response({'error': 'Missing id_ads parameter'}, status=400)

        ad_instance = Ads.objects.get(id_ads=instance_id)

        serializer = PostsSerializer(ad_instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=200)

    except Ads.DoesNotExist:
        return Response({'error': 'Ads not found'}, status=404)
    except DatabaseError:
        return Response({'error': 'Database not responding'}, status=503)

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





