from django.urls import path
from .views import ListCreateNewPasswordEntryView, UpdatePasswordEntryView, ListHistoryView

urlpatterns = [
    path('home/', ListCreateNewPasswordEntryView.as_view(), name='index'),
    path('update/<int:pk>/', UpdatePasswordEntryView.as_view(), name='update'),
    path('history/', ListHistoryView.as_view(), name='history')
]
