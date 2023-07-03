from django.contrib import admin

from .models import JajankenUser


@admin.register(JajankenUser)
class JajankenUser(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_staff', 'is_superuser', ]
