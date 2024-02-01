from django.utils import timezone
from rest_framework import serializers

from cart.models import Cart
from food.serializers import FoodSerializer

from .models import Comment, Discount, Order, OrderItem, OrderStatus


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    food = FoodSerializer()

    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    status = OrderStatusSerializer()
    items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_items(self, obj):
        return OrderItemSerializer(obj.orderitem_set.all(), many=True).data

    def create(self, validated_data):
        user = self.context.get('user')
        validated_data['user'] = user

        coupon = validated_data.get('coupon_code')
        if coupon:
            coupon_exist = Discount.objects.filter(
                code=coupon, expire_at__gte=timezone.now())
            if coupon_exist.exists():
                coupon_obj = coupon_exist.first()
                if coupon_obj.discount != 0:
                    validated_data['discount_amount'] = coupon_obj.discount_amount
                elif coupon_obj.percent != 0:
                    cart_obj = Cart.objects.get_or_create(user=user)
                    price = cart_obj.get_cart_price()
                    validated_data['discount_amount'] = price * \
                        (coupon_obj.discount_percent/100)
            else:
                raise serializers.ValidationError('Coupon code is wrong!')

        return super().create(validated_data)


class CommentSerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)

    class Meta:
        model = Comment
        fields = '__all__'
