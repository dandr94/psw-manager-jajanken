from django.db import models


# Create your models here.


class PasswordManager(models.Model):
    website_name = models.CharField(max_length=200)
    website_url = models.URLField(max_length=200)
    website_account_name = models.CharField(max_length=200)
    website_password = models.CharField(max_length=200)
