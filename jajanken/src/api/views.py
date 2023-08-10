from django.contrib.auth import get_user_model, login, authenticate
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import History, JajankenUser
from .serializers import CreateNewPasswordEntrySerializer, UpdatePasswordEntrySerializer, ListHistorySerializer, \
    PasswordManagerSerializer, RegisterUserSerializer
from .models import PasswordManager
from .helpers import create_history_entry

UserModel = get_user_model()


class RegisterUserView(APIView):
    serializer_class = RegisterUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()

            if user:
                return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({'message': 'Logout successful'})
            except Exception as e:
                return Response({'message': 'Error during logout'}, status=400)

        return Response({'message': 'Invalid request'}, status=400)


class LoginUserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username', None)
        password = request.data.get('password', None)

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            response = Response()
            response.data = {
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh)
            }
            login(request, user)
            return response

        return Response({'error': 'Invalid credentials'}, status=400)


class CreateNewPasswordEntryView(generics.CreateAPIView):
    serializer_class = CreateNewPasswordEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = PasswordManager.objects.filter(user=user.id)

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, read_only=False)
        if serializer.is_valid(raise_exception=True):
            user_id = request.data.get('user_id')
            website_name = request.data.get('website_name')
            password = request.data.get('website_password')

            if not user_id:
                return Response({'error': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = JajankenUser.objects.get(id=user_id)
            except JajankenUser.DoesNotExist:
                return Response({'error': 'Invalid user ID.'}, status=status.HTTP_400_BAD_REQUEST)

            serializer.validated_data['user_id'] = user_id
            serializer.validated_data['website_password'] = password

            self.perform_create(serializer)

            create_history_entry(status='Created', website_name=website_name, user=user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListPasswordEntriesView(generics.ListAPIView):
    serializer_class = PasswordManagerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = PasswordManager.objects.filter(user=user.id)

        return queryset


class UpdateDeletePasswordEntryView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UpdatePasswordEntrySerializer
    queryset = PasswordManager.objects.all()

    def patch(self, request, *args, **kwargs):
        entry = PasswordManager.objects.get(id=kwargs['pk'])
        user = entry.user
        website_name = entry.website_name

        field = request.data.get('field')
        value = request.data.get('value')

        setattr(entry, field, value)

        entry.save()

        create_history_entry(status='Updated', website_name=website_name, user=user)

        return Response({'message': 'Account name updated successfully'})

    def delete(self, request, *args, **kwargs):
        obj_id = kwargs['pk']
        entry = get_object_or_404(PasswordManager, id=obj_id)
        website_name = entry.website_name
        user = entry.user
        create_history_entry(status='Deleted', website_name=website_name, user=user)

        entry.delete()

        return Response({'message': f'{website_name} deleted successfully'})


class ListHistoryView(generics.ListAPIView):
    serializer_class = ListHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = History.objects.filter(user=user.id).order_by('-status_changed')
        return queryset
