from django.db import models

class Dimension(models.Model):
    width = models.FloatField()
    height = models.FloatField()
    depth = models.FloatField()

class Meta(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    barcode = models.CharField(max_length=255)
    qr_code = models.URLField()

class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.FloatField()
    rating = models.FloatField()
    stock = models.IntegerField()
    tags = models.JSONField()
    brand = models.CharField(max_length=255)
    sku = models.CharField(max_length=255)
    weight = models.FloatField()
    dimensions = models.OneToOneField(Dimension, on_delete=models.CASCADE)
    warranty_information = models.CharField(max_length=255)
    shipping_information = models.CharField(max_length=255)
    availability_status = models.CharField(max_length=255)
    return_policy = models.CharField(max_length=255)
    minimum_order_quantity = models.IntegerField()
    meta = models.OneToOneField(Meta, on_delete=models.CASCADE)
    images = models.JSONField()
    thumbnail = models.URLField(null=True, blank=True)

class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE, default=1)
    rating = models.IntegerField()
    comment = models.TextField()
    date = models.DateTimeField()
    reviewer_name = models.CharField(max_length=255)
    reviewer_email = models.EmailField()
