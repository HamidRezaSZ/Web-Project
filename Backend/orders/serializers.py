from rest_framework.permissions import IsAdminUser, IsAuthenticated

from users.viewsets import ModelViewSet

from .models import Comment, Order, OrderStatus
from .serializers import (CommentSerializer, CreateCommentSerializer,
                          OrderSerializer, OrderStatusSerializer)


class OrderStautsView(ModelViewSet):
    permission_classes_by_action = {
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "create": [IsAdminUser],
        "update": [IsAdminUser],
        "partial_update": [IsAdminUser],
        "destroy": [IsAdminUser],
    }

    serializer_class = OrderStatusSerializer
    queryset = OrderStatus.objects.all()


class OrderView(ModelViewSet):
    permission_classes_by_action = {
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "create": [IsAuthenticated],
        "update": [IsAdminUser],
        "partial_update": [IsAdminUser],
        "destroy": [IsAdminUser],
    }

    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class CommentView(ModelViewSet):
    permission_classes_by_action = {
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "create": [IsAuthenticated],
        "update": [IsAdminUser],
        "partial_update": [IsAdminUser],
        "destroy": [IsAdminUser],
    }
    queryset = Comment.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateCommentSerializer

        return CommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"user": self.request.user})
        return context
