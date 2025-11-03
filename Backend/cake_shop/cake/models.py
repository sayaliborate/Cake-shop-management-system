from django.db import models
from django.utils import timezone
class Cake(models.Model):
    name = models.CharField(max_length=100,null=True)
    description = models.TextField(null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2,null=True)
    image = models.ImageField(upload_to='cakes/', blank=True, null=True)
    test = models.CharField(max_length=100,null=True)
    def __str__(self):
        return self.name
    

# Order model
class Order(models.Model):
    WEIGHT_CHOICES = [
        ('0.5', '0.5 kg'),
        ('1', '1 kg'),
        ('1.5', '1.5 kg'),
        ('2', '2 kg'),
        ('custom', 'Custom')
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Delivered', 'Delivered')
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending',null=True)
    cake = models.ForeignKey(Cake, on_delete=models.CASCADE,null=True)
    customer_name = models.CharField(max_length=100,null=True)
    address = models.TextField(null=True)
    weight = models.CharField(max_length=10, choices=WEIGHT_CHOICES,null=True)
    custom_weight = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    quantity = models.PositiveIntegerField(default=1)
    phone_number = models.CharField(max_length=15, null=True, blank=True)  # Add this

    order_date=models.DateTimeField(default=timezone.now)
    order_date=models.DateField(auto_now_add=True,null=True)

    def __str__(self):
        return f"Order of {self.cake.name} by {self.customer_name}"