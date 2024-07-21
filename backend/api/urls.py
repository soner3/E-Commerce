from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("products/", views.ProductsView.as_view(), name="products"),
    path("products/<int:pk>/", views.ProductView.as_view(), name="product"),
    path("user/", views.UserList.as_view(), name="user_list"),
    path("user/create/", views.RegisterUserView.as_view(), name="products"),
    path('token/', views.MyShopTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
