from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from users.viewsets import ModelViewSet

from .models import *
from .serializers import *


class RestaurantCategoryView(ModelViewSet):
    permission_classes_by_action = {
        "list": [AllowAny],
        "retrieve": [AllowAny],
        "create": [IsAdminUser],
        "update": [IsAdminUser],
        "partial_update": [IsAdminUser],
        "destroy": [IsAdminUser],
    }

    serializer_class = RestaurantCategorySerializer
    queryset = RestaurantCategory.objects.all()


class RestaurantView(ModelViewSet):
    permission_classes_by_action = {
        "list": [AllowAny],
        "retrieve": [AllowAny],
        "create": [IsAdminUser],
        "update": [IsAdminUser],
        "partial_update": [IsAdminUser],
        "destroy": [IsAdminUser],
    }

    def get_serializer_class(self):
        if self.action == 'list':
            return AllRestaurantSerializer
        return RestaurantItemSerializer

    queryset = Restaurant.objects.all()
