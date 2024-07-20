import json
from django.core.management.base import BaseCommand
from api.models import Product, Dimension, Review, Meta

class Command(BaseCommand):
    help = 'Load products from a JSON file into the database'

    def handle(self, *args, **kwargs):
        with open('/home/soner/Developement/Fullstack/E-Commerce/backend/data.json', 'r') as file:
            products = json.load(file)
        
        for product_data in products:
            dimension_data = product_data.pop('dimensions')
            meta_data = product_data.pop('meta')
            reviews_data = product_data.pop('reviews')

            meta_data['created_at'] = meta_data.pop('createdAt')
            meta_data['updated_at'] = meta_data.pop('updatedAt')
            meta_data['qr_code'] = meta_data.pop('qrCode')
            
            dimension = Dimension.objects.create(**dimension_data)
            meta = Meta.objects.create(**meta_data)

            product_data['discount_percentage'] = product_data.pop('discountPercentage')
            product_data['warranty_information'] = product_data.pop('warrantyInformation')
            product_data['shipping_information'] = product_data.pop('shippingInformation')
            product_data['availability_status'] = product_data.pop('availabilityStatus')
            product_data['return_policy'] = product_data.pop('returnPolicy')
            product_data['minimum_order_quantity'] = product_data.pop('minimumOrderQuantity')
            
            product = Product.objects.create(
                dimensions=dimension,
                meta=meta,
                **product_data
            )

            for review_data in reviews_data:
                review_data['reviewer_name'] = review_data.pop('reviewerName')
                review_data['reviewer_email'] = review_data.pop('reviewerEmail')
                Review.objects.create(product=product, **review_data)

            product.save()

        self.stdout.write(self.style.SUCCESS('Successfully loaded products'))
