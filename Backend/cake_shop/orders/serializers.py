from rest_framework import serializers
from .models import CakeOrder

class CakeOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CakeOrder
        fields = '__all__'
