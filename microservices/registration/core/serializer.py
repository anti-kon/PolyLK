from rest_framework import serializers
from .models import Persons


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields = '__all__'
