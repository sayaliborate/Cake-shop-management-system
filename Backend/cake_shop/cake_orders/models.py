from django.db import models
from cake.models import Cake  # import Cake model from cake app

class CakeOrder(models.Model):
    cake = models.ForeignKey(Cake, on_delete=models.CASCADE)  # FK to Cake model
    customer_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    payment_method = models.CharField(max_length=20, null=True, blank=True)
    payment_status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"Order {self.id} for {self.cake.name} by {self.customer_name}"
