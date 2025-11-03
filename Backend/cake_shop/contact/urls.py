from django.urls import path
from .views import ContactCreateView, ContactListView

urlpatterns = [
    path('contact/', ContactCreateView.as_view(), name='contact'),
    path('all/', ContactListView.as_view(), name='list-contacts'),  # 👈 this

]
