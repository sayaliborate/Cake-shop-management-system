from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cake
from .serializers import CakeSerializer

@api_view(['GET'])
def list_cakes(request):
    cakes = Cake.objects.all()
    serializer = CakeSerializer(cakes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_cake(request):
    serializer = CakeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Cake added successfully!'})
    return Response(serializer.errors, status=400)


# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cake, Order
from .serializers import OrderSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
def place_order(request):
    if request.data.get('status') != 'Confirmed':
        return Response({'error': 'Order must be confirmed before placing.'}, status=400)

    cake_id = request.data.get('cake')
    if not cake_id:
        return Response({'error': 'Cake ID is required.'}, status=400)

    try:
        cake = Cake.objects.get(pk=cake_id)
    except Cake.DoesNotExist:
        return Response({'error': 'Cake with this ID does not exist.'}, status=404)

    data = request.data.copy()
    data['cake'] = cake.id  # make sure cake id is included

    serializer = OrderSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Order placed successfully!'})
    else:
        logger.error(f"Order serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=400)

# views.py
from rest_framework import generics
from .models import Order
from .serializers import OrderSerializer

class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
