from django.utils.translation import gettext_lazy as _
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .models import User
from .serializers import *
from .viewsets import ModelViewSet


class Register(CreateAPIView):
    serializer_class = UserSerializer


class ProfileView(ModelViewSet):
    permission_classes_by_action = {
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "create": [IsAdminUser],
        "update": [IsAuthenticated],
        "partial_update": [IsAuthenticated],
        "destroy": [IsAdminUser],
    }
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)


class ChangePasswordView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user
