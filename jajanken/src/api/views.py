from django.contrib.auth import get_user_model, logout, login, authenticate
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import History
from .serializers import CreateNewPasswordEntrySerializer, UpdatePasswordEntrySerializer, ListHistorySerializer, \
    PasswordManagerSerializer, RegisterUserSerializer
from .models import PasswordManager
from .helpers import create_history_entry

UserModel = get_user_model()


class RegisterUserView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = RegisterUserSerializer


class LogoutUserView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                return Response({'error': 'Invalid token.'}, status=400)

        response = Response()
        response.delete_cookie('refresh_token')
        return response


class LoginUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=400)


class CreateNewPasswordEntryView(generics.CreateAPIView):
    serializer_class = CreateNewPasswordEntrySerializer
    queryset = PasswordManager.objects.all()

    def create(self, request, *args, **kwargs):
        create_history_entry(status='Created', website_name=self.request.data['website_name'])
        return super(CreateNewPasswordEntryView, self).create(request, *args, **kwargs)


class ListPasswordEntriesView(generics.ListAPIView):
    serializer_class = PasswordManagerSerializer
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
