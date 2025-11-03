from django.urls import path

from cake import views
from .views import place_order
from . import views

urlpatterns = [
    path('place-order/', place_order, name='place_order'),
    path('get-all-orders/', views.get_all_orders, name='get_all_orders'),
    path('update-order-status/<int:order_id>/', views.update_order_status, name='update_order_status'),
    path('orders-list/', views.get_all_orders),


]
