from rest_framework import serializers
from .models import PersonsDocs


class PersonsDocsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonsDocs
        fields = '__all__'
