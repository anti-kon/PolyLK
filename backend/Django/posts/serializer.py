from rest_framework import serializers
from .models import Persons, Ads

class PostsSerializer(serializers.ModelSerializer):

    list_photo_ads = serializers.ListField(child=serializers.CharField(), write_only=True)

    class Meta:
        model = Ads
        fields = '__all__'

    def create(self, validated_data):
        list_photo_ads_data = validated_data.pop('list_photo_ads', [])
        ad_instance = Ads.objects.create(**validated_data)

        for address_file in list_photo_ads_data:
            ad_instance.list_photo_ads.create(address_files=address_file)

        return ad_instance


