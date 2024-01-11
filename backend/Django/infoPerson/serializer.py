from rest_framework import serializers
from .models import PersonsDocs
from .models import Persons


class PersonsDocsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonsDocs
        fields = '__all__'


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields = '__all__'
