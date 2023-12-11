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

                serializer.save()

                return Response(status=200)
        except DatabaseError:
            return Response({'error': 'Database not responding'}, status=503)

def get(self, request, *args, **kwargs):
    dorm_num_ads = self.request.query_params.get('dorm_num_ads')
    try:
        queryset = Ads.objects.all()

        if dorm_num_ads:
            queryset = queryset.filter(list_ads__dorm_num_ads=dorm_num_ads)

        serializer = PostsSerializer(queryset, many=True)
        return Response(serializer.data, status=200)
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





