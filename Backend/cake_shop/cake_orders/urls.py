from django.urls import path
from . import views

urlpatterns = [
    path('cake-order/', views.place_order, name='place_order'),
]
