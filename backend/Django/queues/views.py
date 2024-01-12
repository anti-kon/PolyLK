from django.shortcuts import render
from django.http import HttpResponse

class RecordsMachinesView(APIView):
    def get(self, request):
        try:
            RecordsMachines = RecordsMachines.objects.all()
            serializer = RecordsMachinesSerializer(instance=RecordsMachines, many=True)
            return Response(serializer.data, status=200)

        except DatabaseError:
            return Response('Database Error', status=503)

    def post(self, request):
        try:
            text_RecordsMachines = request.data.get('text_new')
            list_photo_RecordsMachines = request.data.get('list_photo_new')
            new_record = RecordsMachines(text_new=text_RecordsMachines, list_photo_new=upload_photo(list_photo_RecordsMachines, text_RecordsMachines))

            new_record.save()
            return Response("OK", status=200)

        except DatabaseError as e:
            return Response('Database Error', status=503)

    def delete(self, request):
        try:
            RecordsMachines_to_delete = RecordsMachines.objects.get(id_new=request.data.get('id_new'))
            delete_photo(RecordsMachines_to_delete.list_photo_new)
            RecordsMachines_to_delete.delete()

            return Response("OK", status=200)

        except RecordsMachines.DoesNotExist:
            return Response('The RecordsMachines was not found', status=404)

        except DatabaseError:
            return Response("Database Error", status=503)

    def put(self, request):
        try:
            RecordsMachines_to_change = RecordsMachines.objects.get(id_new=request.data.get('id_new'))
            text_new = request.data.get('text_new')
            list_photo_new = request.data.get('list_photo_new')

            if text_new != None:
                RecordsMachines_to_change.text_new = text_new

            if list_photo_new != None:
                delete_photo(RecordsMachines_to_change.list_photo_new)
                RecordsMachines_to_change.list_photo_new = upload_photo(list_photo_new, RecordsMachines_to_change.list_photo_new)

            RecordsMachines_to_change.save()

            serializer = RecordsMachinesSerializer(RecordsMachines_to_change)

            return Response(serializer.data, status=200)
        except RecordsMachines.DoesNotExist:
            return Response('The RecordsMachines was not found', status=404)

        except DatabaseError:
            return Response('Database Error', status=503)
        
