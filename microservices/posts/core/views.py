import json
import io
import os

from PIL import Image, ImageFile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .models import Persons, Ads
from .serializer import PostsSerializer
from rest_framework.response import Response
from django.db import *
ImageFile.LOAD_TRUNCATED_IMAGES = True

def delete_photo(paths_photo):
    if paths_photo:
        for path in paths_photo:
            os.remove(path)

def upload_photo(list_photo_ads, info_ads):
    path_photo_ads = []
    print(list_photo_ads, info_ads)
    for i, byte_img in enumerate(list_photo_ads):
        print(byte_img)
        im = Image.open(io.BytesIO(byte_img))
        im.save(f'posts/img_user/{info_ads[:10]}_{i}.png')
        path_photo_ads.append(f'posts/img_user/{info_ads[:10]}_{i}.png')
    return path_photo_ads
    # path_photo = []
    # for i, img in enumerate(list_photo_ads):
    #     file_name = f'{info_ads[:10]}_{i}.png'
    #     print(img)
    #     file_path = default_storage.save(file_name, ContentFile(img.read()))
    #     saved_file_path = default_storage.url(file_path)
    #     path_photo.append(saved_file_path)
    # return path_photo


class PostsView(APIView):

    def get_all_ads(self):
        queryset = Ads.objects.all()
        serializer = PostsSerializer(instance=queryset, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        try:
            # serializer = PostsSerializer(data=request.data)
            # if serializer.is_valid(raise_exception=True):
            #     dorm_num_ads = serializer.validated_data['dorm_num_ads']
            #     info_ads = serializer.validated_data['info_ads']
            #     price_ads = serializer.validated_data['price_ads']
            #     if price_ads < 0:
            #         return Response({'error': 'Invalid price'}, status=400)
            #     alternative_payment_ads = serializer.validated_data['alternative_payment_ads']
            #     id_person_ads = serializer.validated_data['id_person_ads']
            #     list_photo_ads = serializer.validated_data['list_photo_ads']
            #     list_photo_ads = upload_photo(list_photo_ads, info_ads)
            #     serializer.save()
            #     return Response(status=200)
            dorm_num_ads = request.data["dorm_num_ads"]
            info_ads = request.data["info_ads"]
            price_ads = request.data["price_ads"]
            alternative_payment_ads = request.data["alternative_payment_ads"]
            list_photo_ads = request.data["list_photo_ads"]
            id_person_ads = request.data["id_person_ads"]

            print(request.data)
            paths =[]
            for image in request.FILES.getlist('list_photo_ads'):
                paths.append(default_storage.save('tmp/' + image.name, ContentFile(image.read())))
                new_record = Ads(info_ads=info_ads, dorm_num_ads=dorm_num_ads,
                                price_ads=price_ads, alternative_payment_ads=alternative_payment_ads,
                                list_photo_ads=paths, id_person_ads=id_person_ads)
                new_record.save()

            # data = {
            #     'dorm_num_ads': dorm_num_ads,
            #     'info_ads': info_ads,
            #     'price_ads': price_ads,
            #     'alternative_payment_ads': alternative_payment_ads,
            #     'list_photo_ads': path_photo,
            #     'id_person_ads': id_person_ads
            # }
            #
            # serializer = PostsSerializer(data=data)
            # if serializer.is_valid(raise_exception=True):
            #     serializer.save()
            return Response(data='OK', status=200)
        except DatabaseError:
            return Response(data='База данных не отвечает', status=503)

        def get(self, request, *args, **kwargs):
            dorm_num_ads = self.request.query_params.get('dorm_num_ads')
            try:
                queryset = Ads.objects.all()
                if dorm_num_ads:
                    queryset = queryset.filter(dorm_num_ads=dorm_num_ads)
                    serializer = PostsSerializer(queryset, many=True)
                    return Response(serializer.data, status=200)
                else:
                    return Response('Номер общежития не найден', status=403)
            except DatabaseError:
                return Response(data='База данных не отвечает', status=503)

        def put(self, request):
            try:
                ads_to_change = Ads.objects.get(id_ads=request.data.get('id_ads'))
                dorm_num_ads = request.data.get('dorm_num_ads')
                info_ads = request.data.get('info_ads')
                price_ads = request.data.get('price_ads')
                alternative_payment_ads = request.data.get('alternative_payment_ads')
                id_person_ads = request.data.get('id_person_ads')  # Нужно ли менять!!!
                list_photo_ads = request.data.get('list_photo_ads')

                if dorm_num_ads != None:
                    ads_to_change.dorm_num_ads = dorm_num_ads

                if info_ads != None:
                    ads_to_change.info_ads = info_ads

                if price_ads != None:
                    ads_to_change.price_ads = price_ads

                if alternative_payment_ads != None:
                    ads_to_change.alternative_payment_ads = alternative_payment_ads

                if id_person_ads != None:
                    ads_to_change.id_person_ads = id_person_ads  # Нужно ли менять!!!

                if list_photo_ads != None:
                    delete_photo(ads_to_change.list_photo_ads)
                    ads_to_change.list_photo_ads = upload_photo(list_photo_ads, info_ads)

                ads_to_change.save()

                serializer = PostsSerializer(ads_to_change)

                return Response(serializer.data, status=200)
            except Ads.DoesNotExist:
                return Response('Объявление не было найдено', status=404)
            except DatabaseError:
                return Response('База данных не отвечает', status=503)

        def delete(self, request):
            try:
                ads_to_delete = Ads.objects.get(id_ads=request.data.get('id_ads'))
                delete_photo(ads_to_delete.list_photo_ads)
                ads_to_delete.delete()

                return Response("OK", status=200)

            except Ads.DoesNotExist:
                return Response('Объявление не было найдено', status=404)

            except DatabaseError:
                return Response("База данных не отвечает", status=503)
