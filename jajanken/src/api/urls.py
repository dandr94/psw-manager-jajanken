from django.urls import path
from .views import ListCreateNewPasswordEntryView, UpdateDeletePasswordEntryView, ListHistoryView

urlpatterns = [
    path('home/', ListCreateNewPasswordEntryView.as_view(), name='index'),
    path('update/<int:pk>/', UpdateDeletePasswordEntryView.as_view(), name='update'),
    path('delete/<int:pk>/', UpdateDeletePasswordEntryView.as_view(), name='delete'),
    path('history/', ListHistoryView.as_view(), name='history')
]
