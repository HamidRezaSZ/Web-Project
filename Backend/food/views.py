from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from users.viewsets import ModelViewSet

from .models import *
from .serializers import *


class FoodCategoryView(ModelViewSet):
    permission_classes_by_action = {
        "list": [AllowAny],
        "retrieve": [AllowAny],
        "create": [IsAdminUser],
        "update": [IsAdminUser],
        "partial_update": [IsAdminUser],
        "destroy": [IsAdminUser],
    }

    serializer_class = FoodCategorySerializer
    queryset = FoodCategory.objects.all()


class FoodView(ModelViewSet):
    permission_classes_by_action = {
        "list": [AllowAny],
        "retrieve": [AllowAny],
        "create": [IsAdminUser],
        "update": [IsAdminUser],
        "partial_update": [IsAdminUser],
        "destroy": [IsAdminUser],
    }

    serializer_class = FoodSerializer
    queryset = Food.objects.all()
