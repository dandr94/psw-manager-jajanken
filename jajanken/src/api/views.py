from rest_framework import generics
from rest_framework.response import Response
from .models import History
from .serializers import CreateNewPasswordEntrySerializer, UpdatePasswordEntrySerializer, ListHistorySerializer
from .models import PasswordManager


class ListCreateNewPasswordEntryView(generics.ListCreateAPIView):
    serializer_class = CreateNewPasswordEntrySerializer
    queryset = PasswordManager.objects.all()


class UpdatePasswordEntryView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UpdatePasswordEntrySerializer
    queryset = PasswordManager.objects.all()

    def patch(self, request, *args, **kwargs):
        field = request.data.get('field')
        value = request.data.get('value')
        obj_id = kwargs['pk']
        website_name = request.data.get('websiteName')

        entry = PasswordManager.objects.get(id=obj_id)

        setattr(entry, field, value)

        entry.save()

        history = History.objects.create(
            status='Updated',
            website_name=website_name,
        )

        return Response({'message': 'Account name updated successfully'})


class ListHistoryView(generics.ListAPIView):
    serializer_class = ListHistorySerializer
    queryset = History.objects.all()

