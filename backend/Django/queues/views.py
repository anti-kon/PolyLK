from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import Services, RecordsMachines, Machines

class MachinesView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = Machines.objects.all()
            response_list = []
            for machine in queryset:
                id_machine = machine.values_list("id_machine", flat=True).first()
                num_machine = machine.values_list("num_machine", flat=True).first()
                type_machine = machine.values_list("type_machine", flat=True).first()
                is_broken_machine = machine.values_list("is_broken", flat=True).first()
                dorm_num_machine = machine.values_list("dorm_num_machine", flat=True).first()
                data_machine = {
                    "id_machine": id_machine,
                    "num_machine": num_machine,
                    "type_machine": type_machine,
                    "is_broken_machine": is_broken_machine,
                    "dorm_num_machine": dorm_num_machine
                }
                response_list.append(data_machine)
            response_data = {
                "machine_list": response_list
            }
            serializer = MachinesSerializer(response_data, many=True)
            return Response(serializer.data, status=200)
        except DatabaseError:
            return Response(status=503)

class RecordsMachinesView(APIView):
    def get(self, request, *args, **kwargs):
        dorm_num_rm = self.request.query_params.get('dorm_num_rm')
        try:
            queryset = RecordsMachines.objects.all()
            if dorm_num_rm:
                queryset = queryset.filter(dorm_num_rm=dorm_num_rm)
                response_list = []
                for ads in queryset:
                    id_record_machine = ads.values_list("id_record_machine", flat=True).first()
                    id_person_rm = ads.values_list("id_person_rm", flat=True).first()
                    dorm_num_rm = ads.values_list("dorm_num_rm", flat=True).first()
                    id_machine_rm = ads.values_list("id_machine_rm", flat=True).first()
                    start_time_rm = ads.values_list("start_time_rm", flat=True).first()
                    end_time_rm = ads.values_list("end_time_rm", flat=True).first()
                    data_recordsMachines = {
                        "id_record_machine": id_record_machine,
                        "id_person_rm": id_person_rm,
                        "dorm_num_rm": dorm_num_rm,
                        "id_machine_rm": id_machine_rm,
                        "start_time_rm": start_time_rm,
                        "end_time_rm": end_time_rm,
                    }
                    response_list.append(data_recordsMachines)
            response_data = {
                "list_wmRec": response_list
            }
            serializer = PostsSerializer(response_data, many=True)
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
            new_recordsMachines.save()
            return Response("OK", status=200)

        except DatabaseError as e:
            return Response('Database Error', status=503)

    def delete(self, request):
        try:
            RecordsMachines_to_delete = RecordsMachines.objects.get(id_record_machine=request.data.get('id_record_machine'))
            RecordsMachines_to_delete.delete()
            return Response("OK", status=200)

        except RecordsMachines.DoesNotExist:
            return Response('The RecordsMachines was not found', status=404)

        except DatabaseError:
            return Response("Database Error", status=503)
class ServicesView(APIView):

    def get(self, request, *args, **kwargs):
        id_person = self.request.query_params.get('id_person')
        try:
            queryset = Services.objects.all()
            if id_person:
                queryset = queryset.filter(id_person_services=id_person)
                response_list = []
                for service in queryset:
                    id_service = service.values_list("id_service", flat=True).first()
                    service = service.values_list("service", flat=True).first()
                    date_time_service = service.values_list("date_time_service", flat=True).first()
                    id_person_service = service.values_list("id_person_service", flat=True).first()
                    message_service = service.values_list("message_service", flat=True).first()
                    data_service = {
                        "id_service": id_service,
                        "service": service,
                        "date_time_service": date_time_service,
                        "id_person_service": id_person_service,
                        "message_service": message_service
                    }
                    response_list.append(data_service)
            response_data = {
                "list_services": response_list
            }
            serializer = ServicesSerializer(response_data, many=True)
            return Response(serializer.data, status=200)
        except DatabaseError:
            return Response(status=503)

    def post(self, request):
        try:
            service = request.data.get('service')
            date_time_service = request.data.get('date_time_service')
            id_person_service = request.data.get('id_person_service')
            message_service = request.data.get('message_service')
            new_service = Services(service=service,
                                  date_time_service=date_time_service,
                                  id_person_service=id_person_service,
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
