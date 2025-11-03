from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CakeOrder
from .serializers import CakeOrderSerializer

@api_view(['POST'])
def place_order(request):
    serializer = CakeOrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Order placed successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CakeOrder
from .serializers import CakeOrderSerializer

@api_view(['GET'])
def get_all_orders(request):
    orders = CakeOrder.objects.all()
    serializer = CakeOrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# orders/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CakeOrder
from .serializers import CakeOrderSerializer

@api_view(['POST'])
def update_order_status(request, order_id):
    try:
        order = CakeOrder.objects.get(id=order_id)
    except CakeOrder.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # Get status from request data
    status_value = request.data.get('status')
    if not status_value:
        return Response({"error": "Status not provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Update the order status
    order.status = status_value
    order.save()

    # Serialize and return the updated order
    serializer = CakeOrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_all_orders(request):
    orders = CakeOrder.objects.all()
    serializer = CakeOrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
