from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import PasswordManager
from .models import History

UserModel = get_user_model()


class PasswordManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordManager
        fields = ('id', 'website_name', 'website_url', 'website_account_name', 'website_password')


class CreateNewPasswordEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordManager
        fields = ('id', 'website_name', 'website_url', 'website_account_name', 'website_password')


class UpdatePasswordEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordManager
        fields = ('id', 'website_name', 'website_url', 'website_account_name', 'website_password')


class ListHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ('id', 'status', 'website_name', 'status_changed')


class RegisterUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=True)

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=UserModel.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserModel
        fields = ('username', 'email', 'password', 'password2',)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        print(validated_data)
        user = UserModel.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
