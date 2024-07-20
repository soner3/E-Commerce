from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Product
from .serializers import ProductSerializer

# Create your views here.


@api_view(["GET"])
def getRoutes(request):
    return Response("Hello")


@api_view(["GET"])
def getProducts(request):
    product = Product.objects.all()
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProduct(request, pk):
    product = Product.objects.get(pk = pk)
    serializer = ProductSerializer(product)

    return Response(serializer.data)
