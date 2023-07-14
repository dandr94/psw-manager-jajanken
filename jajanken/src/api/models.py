from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import MinLengthValidator
from django.db import models
from .managers import JajankenUserManager


class JajankenUser(AbstractBaseUser, PermissionsMixin):
    USERNAME_MAX_LEN = 15
    USERNAME_MIN_LEN = 2
    USERNAME_UNIQUE_ERROR_MESSAGE = 'Username is not available'

    EMAIL_UNIQUE_ERROR_MESSAGE = 'This email is already used'

    USERNAME_ERROR_MESSAGE = 'Username can contain only letters and numbers.'

    username = models.CharField(
        unique=True,
        null=False,
        blank=False,
        max_length=USERNAME_MAX_LEN,
        validators=[MinLengthValidator(USERNAME_MIN_LEN)],
        error_messages={
            'unique': USERNAME_UNIQUE_ERROR_MESSAGE
        }
    )

    email = models.EmailField(
        unique=True,
        null=False,
        blank=False,
        error_messages={
            'unique': EMAIL_UNIQUE_ERROR_MESSAGE
        }

    )
    date_joined = models.DateTimeField(
        auto_now_add=True
    )

    is_staff = models.BooleanField(
        default=False
    )

    is_superuser = models.BooleanField(
        default=False
    )

    is_active = models.BooleanField(
        default=True
    )

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = JajankenUserManager()


class PasswordManager(models.Model):
    WEBSITE_NAME_MAX_CHAR = 50
    WEBSITE_NAME_MIN_CHAR = 2
    WEBSITE_NAME_VERBOSE_NAME = "Website name"

    WEBSITE_URL_MAX_CHAR = 200
    WEBSITE_URL_VERBOSE_NAME = 'Website URL'

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

    user = models.ForeignKey(
        JajankenUser,
        on_delete=models.CASCADE
    )


class History(models.Model):
    STATUS_MAX_CHAR = 7
    WEBSITE_NAME_MAX_CHAR = 2

    status_choices = [
        ('created', 'Created'),
        ('updated', 'Updated'),
        ('deleted', 'Deleted')
    ]

    status = models.CharField(
        max_length=STATUS_MAX_CHAR,
        choices=status_choices
    )

    website_name = models.CharField(
        max_length=WEBSITE_NAME_MAX_CHAR
    )

    status_changed = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(
        JajankenUser,
        on_delete=models.CASCADE
    )
