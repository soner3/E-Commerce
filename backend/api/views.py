from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import authentication, permissions, generics
from api.models import Product
from .serializers import ProductSerializer, UserSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyShopObtainPairSerializer

# Create your views here.


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MyShopTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyShopObtainPairSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)

        # refresh_token = request.data.get("refresh")

        # if refresh_token:
        #     request.set_cookie(
        #         "refresh_token",
        #         refresh_token,
        #         httponly=True,
        #         # secure=settings.SECURE_SSL_REDIRECT,   (HTTPS)
        #         samesite="Strict",
        #     )

        return response


class UserList(APIView):

    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class ProductsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        products = Product.objects.get(pk=pk)
        serializer = ProductSerializer(products)
        return Response(serializer.data)
