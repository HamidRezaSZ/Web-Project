from rest_framework.serializers import ModelSerializer, SerializerMethodField

from food.serializers import FoodSerializer

from .models import *


class CartItemGetSerializer(ModelSerializer):
    food = FoodSerializer()

    class Meta:
        model = CartItem
        exclude = ('cart',)


class CartItemSerializer(ModelSerializer):
    class Meta:
        model = CartItem
        exclude = ('cart',)

    def create(self, validated_data):
        user = self.context['user']
        cart_obj = Cart.objects.get_or_create(user=user)
        item = CartItem.objects.filter(
            cart=cart_obj, food=validated_data['food'])
        if item.exists():
            item = item.first()
            item.quantity += validated_data['quantity']
            item.save()
            return item

        validated_data['cart'] = cart_obj
        return CartItem.objects.create(**validated_data)


class CartSerializer(ModelSerializer):
    items = SerializerMethodField()
    price = SerializerMethodField()

    class Meta:
        model = Cart
        exclude = ('user',)

    def get_items(self, obj):
        return CartItemSerializer(obj.cartitem_set.all(), many=True).data

    def get_price(self, obj):
        return obj.get_cart_price()
