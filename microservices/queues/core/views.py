from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Services, RecordsMachines, Machines
from .serializer import MachinesSerializer, RecordsMachinesSerializer, ServicesSerializer
from django.db import *
import datetime


class MachinesView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            queryset = Machines.objects.all()
            serializer = MachinesSerializer(instance=queryset, many=True)
            return Response(serializer.data, status=200)
        except DatabaseError:
            return Response(status=503)


class RecordsMachinesView(APIView):

    def get(self, request, *args, **kwargs):
        dorm_num_rm = self.request.query_params.get('dorm_num_rm')
        try:
            queryset = RecordsMachines.objects.all()
            queryset = queryset.filter(dorm_num_rm=dorm_num_rm)
            serializer = RecordsMachinesSerializer(instance=queryset, many=True)
            return Response(serializer.data, status=200)
        except DatabaseError:
            return Response(status=503)

    def post(self, request):
        try:
            id_person_rm = request.data.get('id_person_rm')
            dorm_num_rm = request.data.get('dorm_num_rm')
            id_machine_rm = request.data.get('id_machine_rm')
            start_time_rm = request.data.get('start_time_rm')
            end_time_rm = request.data.get('end_time_rm')
            new_recordsMachines = RecordsMachines(id_person_rm=id_person_rm,
                                                  dorm_num_rm=dorm_num_rm,
                                                  id_machine_rm=id_machine_rm,
                                                  start_time_rm=start_time_rm,
                                                  end_time_rm=end_time_rm)

            records = RecordsMachines.objects.filter(id_machine_rm=id_machine_rm)
            for record in records:
                if ((datetime.datetime.strptime(start_time_rm, '%Y-%m-%dT%H:%M:%SZ') < record.end_time_rm) and
                        (datetime.datetime.strptime(end_time_rm, '%Y-%m-%dT%H:%M:%SZ') > record.start_time_rm)):
                    return Response("Машинка занята", status=412)
            new_recordsMachines.save()
            return Response("OK", status=200)

        except DatabaseError as e:
            return Response('Database Error', status=503)

    def delete(self, request):
        try:
            RecordsMachines_to_delete = RecordsMachines.objects.get(
                id_record_machine=request.data.get('id_record_machine'))
            RecordsMachines_to_delete.delete()
            return Response("OK", status=200)

        except RecordsMachines.DoesNotExist:
            return Response('The RecordsMachines was not found', status=404)

        except DatabaseError:
            return Response("Database Error", status=503)


class ServicesView(APIView):

    def get(self, request, *args, **kwargs):
        person_id = self.request.query_params.get('person_id')
        try:
            queryset = Services.objects.all()
            queryset = queryset.filter(id_person=person_id)
            serializer = ServicesSerializer(queryset, many=True)
            return Response(serializer.data, status=200)
        except DatabaseError:
            return Response(status=503)

    def post(self, request):
        try:
            service = request.data.get('service')
            date_time_service = request.data.get('date_time_service')
            id_person = request.data.get('id_person')
            message_service = request.data.get('message_service')
            new_service = Services(service=service,
                                   date_time_service=date_time_service,
                                   id_person=id_person,
                                   message_service=message_service)
            new_service.save()
            return Response("OK", status=200)

        except DatabaseError as e:
            return Response('Database Error', status=503)

    def delete(self, request):
        try:
            Services_to_delete = Services.objects.get(id_service=request.data.get('id_service'))
            Services_to_delete.delete()
            return Response("OK", status=200)
        except Services.DoesNotExist:
            return Response('The Services was not found', status=404)
        except DatabaseError:
            return Response("Database Error", status=503)
