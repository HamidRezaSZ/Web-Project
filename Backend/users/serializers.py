
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'phone_number',
                  'gender', 'password', 'confirm_password', 'birth_date', 'birth_date', 'address')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return super().validate(attrs)

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)

        return user


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'gender', 'phone_number',
                  'balance', 'birth_date', 'national_code', 'address')
        read_only_fields = ('balance',)


class ChangePasswordSerializer(ModelSerializer):
    """
    User change password serializers
    """

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'confirm_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return super().validate(attrs)

    def update(self, instance, validated_data):
        if not instance.check_password(validated_data['old_password']):
            raise serializers.ValidationError(
                {"old_password": "Old password is not correct"})

        instance.set_password(validated_data['password'])
        instance.save()

        return instance
