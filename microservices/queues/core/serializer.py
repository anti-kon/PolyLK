from rest_framework import serializers
from .models import Services
from .models import RecordsMachines
from .models import Machines


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'


class RecordsMachinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordsMachines
        fields = '__all__'


class MachinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machines
        fields = '__all__'
