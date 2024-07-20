from rest_framework import serializers
from .models import Product, Review, Dimension, Meta

class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = ['width', 'height', 'depth']

class MetaSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField( format="%Y-%m-%dT%H:%M:%S.%fZ")
    updated_at = serializers.DateTimeField( format="%Y-%m-%dT%H:%M:%S.%fZ")
    qr_code = serializers.URLField()

    class Meta:
        model = Meta
        fields = ['created_at', 'updated_at', 'barcode', 'qr_code']

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.CharField()
    reviewer_email = serializers.EmailField()

    class Meta:
        model = Review
        fields = ['rating', 'comment', 'date', 'reviewer_name', 'reviewer_email']

class ProductSerializer(serializers.ModelSerializer):
    dimensions = DimensionSerializer()
    meta = MetaSerializer()
    reviews = ReviewSerializer(many=True, read_only=True)

    discountPercentage = serializers.FloatField(source='discount_percentage')
    warrantyInformation = serializers.CharField(source='warranty_information')
    shippingInformation = serializers.CharField(source='shipping_information')
    availabilityStatus = serializers.CharField(source='availability_status')
    returnPolicy = serializers.CharField(source='return_policy')
    minimumOrderQuantity = serializers.IntegerField(source='minimum_order_quantity')

    class Meta:
        model = Product
        fields = "__all__"
