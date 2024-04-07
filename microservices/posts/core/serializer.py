from rest_framework import serializers
from .models import Ads


class PostsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ads
        fields = '__all__'
