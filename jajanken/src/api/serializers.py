from rest_framework import serializers
from .models import PasswordManager


class PasswordManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordManager
        fields = ('website_name', 'website_url', 'website_account_name', 'website_password')
