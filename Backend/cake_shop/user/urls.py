from django.urls import path
from .views import CustomUserCreateView, LoginView, RetrieveUsernameView

urlpatterns = [
    path('create-user/', CustomUserCreateView.as_view(), name='create-user'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/get-username/', RetrieveUsernameView.as_view(), name='get_username'),

]
