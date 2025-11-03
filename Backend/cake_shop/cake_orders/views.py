from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CakeOrder

@csrf_exempt  # for quick test; better to handle CSRF properly later
def place_order(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Extract data from JSON payload
        cake_id = data.get('cake_id')
        customer_name = data.get('customer_name')
        phone_number = data.get('phone_number')
        address = data.get('address')
        payment_method = data.get('payment_method')
        payment_status = data.get('payment_status', 'Pending')

        # Create CakeOrder object
        order = CakeOrder.objects.create(
            cake_id=cake_id,
            customer_name=customer_name,
            phone_number=phone_number,
            address=address,
            payment_method=payment_method,
            payment_status=payment_status
        )
        return JsonResponse({'message': 'Order placed successfully', 'order_id': order.id})
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=400)
