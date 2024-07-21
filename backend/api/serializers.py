from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token
from .models import Product, Review, Dimension, Meta
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Benutzername ist bereits vergeben.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("E-Mail-Adresse ist bereits vergeben.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class MyShopObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'username_or_email'
    
    @classmethod
    def get_token(cls, user:User) -> Token:
        token = super().get_token(user)
        token["username"] = user.username
        return token
    

    def validate(self, attrs):
        credentials = {
            'username': attrs.get('username_or_email'),
            'password': attrs.get('password')
        }

        if credentials['username'] and credentials['password']:
            user = None

            # Suche nach Benutzername
            try:
                user = User.objects.get(username=credentials['username'])
            except User.DoesNotExist:
                # Suche nach E-Mail-Adresse
                try:
                    user = User.objects.get(email=credentials['username'])
                except User.DoesNotExist:
                    pass

            if user and user.check_password(credentials['password']):
                refresh = self.get_token(user)

                return {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'username': user.username,
                }

        raise serializers.ValidationError('No active account found with the given credentials', code='authorization')

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = "__all__"

class DimensionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Dimension
        fields = ['width', 'height', 'depth']

class MetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meta
        fields = ['created_at', 'updated_at', 'barcode', 'qr_code']

class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = ['rating', 'comment', 'date', 'reviewer_name', 'reviewer_email']

class ProductSerializer(serializers.ModelSerializer):
    dimensions = DimensionSerializer()
    meta = MetaSerializer()
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = "__all__"
