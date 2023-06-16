from django.core.validators import MinLengthValidator
from django.db import models


class PasswordManager(models.Model):
    WEBSITE_NAME_MAX_CHAR = 50
    WEBSITE_NAME_MIN_CHAR = 2
    WEBSITE_NAME_VERBOSE_NAME = "Name"

    WEBSITE_URL_MAX_CHAR = 200
    WEBSITE_URL_VERBOSE_NAME = 'URL'

    WEBSITE_ACCOUNT_NAME_MAX_CHAR = 50
    WEBSITE_ACCOUNT_NAME_VERBOSE_NAME = 'Account name'

    WEBSITE_PASSWORD_MAX_CHAR = 200
    WEBSITE_PASSWORD_MIN_CHAR = 3
    WEBSITE_PASSWORD_VERBOSE_NAME = 'Account password'

    website_name = models.CharField(max_length=WEBSITE_NAME_MAX_CHAR,
                                    validators=[MinLengthValidator(WEBSITE_NAME_MIN_CHAR)],
                                    verbose_name=WEBSITE_NAME_VERBOSE_NAME)

    website_url = models.URLField(max_length=WEBSITE_URL_MAX_CHAR,
                                  blank=True,
                                  null=True,
                                  verbose_name=WEBSITE_URL_VERBOSE_NAME)

    website_account_name = models.CharField(max_length=WEBSITE_ACCOUNT_NAME_MAX_CHAR,
                                            blank=True,
                                            null=True,
                                            verbose_name=WEBSITE_ACCOUNT_NAME_VERBOSE_NAME)
    website_password = models.CharField(max_length=WEBSITE_PASSWORD_MAX_CHAR,
                                        validators=[MinLengthValidator(WEBSITE_PASSWORD_MIN_CHAR)],
                                        verbose_name=WEBSITE_PASSWORD_VERBOSE_NAME)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)
