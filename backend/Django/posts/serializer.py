from rest_framework import serializers
from .models import Persons, Ads


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ads
        fields = '__all__'

