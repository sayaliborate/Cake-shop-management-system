from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.list_cakes, name='list_cakes'),
    path('add/', views.add_cake, name='add_cake'),
    path('place-order/', views.place_order, name='place_order'),  # if you’ve added this view
    path('orders/', views.OrderListView.as_view(), name='order-list'),

]
