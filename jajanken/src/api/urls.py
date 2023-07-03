from django.urls import path
from .views import ListPasswordEntriesView, UpdateDeletePasswordEntryView, ListHistoryView, CreateNewPasswordEntryView, \
    RegisterUserView, LogoutUserView, LoginUserView

urlpatterns = [
    path('', ListPasswordEntriesView.as_view(), name='index'),
    path('login/', LoginUserView.as_view(), name='register'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    path('submit/', CreateNewPasswordEntryView.as_view(), name='create'),
    path('update/<int:pk>/', UpdateDeletePasswordEntryView.as_view(), name='update'),
    path('delete/<int:pk>/', UpdateDeletePasswordEntryView.as_view(), name='delete'),
    path('history/', ListHistoryView.as_view(), name='history')
]
