from rest_framework import serializers
from .models import Persons


class AuthorizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields = '__all__'
