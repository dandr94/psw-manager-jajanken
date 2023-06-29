from rest_framework import serializers
from .models import PasswordManager
from .models import History


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
