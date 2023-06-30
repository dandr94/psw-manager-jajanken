from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from .models import History
from .serializers import CreateNewPasswordEntrySerializer, UpdatePasswordEntrySerializer, ListHistorySerializer
from .models import PasswordManager
from .helpers import create_history_entry


class ListCreateNewPasswordEntryView(generics.ListCreateAPIView):
    serializer_class = CreateNewPasswordEntrySerializer
    queryset = PasswordManager.objects.all()


class UpdateDeletePasswordEntryView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UpdatePasswordEntrySerializer
    queryset = PasswordManager.objects.all()

    def patch(self, request, *args, **kwargs):
        entry = PasswordManager.objects.get(id=kwargs['pk'])

        website_name = entry.website_name

        field = request.data.get('field')
        value = request.data.get('value')

        setattr(entry, field, value)

        entry.save()

        create_history_entry(status=value, website_name=website_name)

        return Response({'message': 'Account name updated successfully'})

    def delete(self, request, *args, **kwargs):
        obj_id = kwargs['pk']
        entry = get_object_or_404(PasswordManager, id=obj_id)
        website_name = entry.website_name
        create_history_entry(status='Deleted', website_name=website_name)

        entry.delete()

        return Response({'message': f'{website_name} deleted successfully'})



class ListHistoryView(generics.ListAPIView):
    serializer_class = ListHistorySerializer
    queryset = History.objects.all()
