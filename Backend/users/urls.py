from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from .views import *

router = DefaultRouter()

router.register(r'profile', ProfileView, basename='profile')

urlpatterns = [
    path('register/', Register.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('change_password/', ChangePasswordView.as_view()),
] + router.urls
