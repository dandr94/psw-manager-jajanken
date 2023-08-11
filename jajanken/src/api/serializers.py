from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinLengthValidator, MaxLengthValidator
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
    USERNAME_MAX_LEN = 15
    USERNAME_MIN_LEN = 2
    USERNAME_UNIQUE_ERROR_MESSAGE = 'This username is already used.'
    USERNAME_MIN_LEN_ERROR_MESSAGE = 'Ensure username has at least 2 characters (max 15).'
    USERNAME_MAX_LEN_ERROR_MESSAGE = 'Ensure username has at most 15 characters (min 2).'

    EMAIL_UNIQUE_ERROR_MESSAGE = 'This email is already used.'

    USERNAME_ERROR_MESSAGE = 'Username can contain only letters and numbers.'

    PASSWORD_DOES_NOT_MATCH_ERROR_MESSAGE = "Password fields didn't match."

    username = serializers.CharField(
        write_only=True,
        required=True,
        validators=[UniqueValidator(queryset=UserModel.objects.all(), message=USERNAME_UNIQUE_ERROR_MESSAGE),
                    MinLengthValidator(2, message=USERNAME_MIN_LEN_ERROR_MESSAGE),
                    MaxLengthValidator(15, message=USERNAME_MAX_LEN_ERROR_MESSAGE)
                    ]

    )

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=UserModel.objects.all(), message=EMAIL_UNIQUE_ERROR_MESSAGE)]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": self.PASSWORD_DOES_NOT_MATCH_ERROR_MESSAGE})

        return attrs

    def create(self, validated_data):
        user = UserModel.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ('username', 'email', 'password', 'password2',)
