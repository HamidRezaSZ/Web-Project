from rest_framework.serializers import ModelSerializer, SerializerMethodField

from orders.models import Comment, OrderItem

from .models import Food, FoodCategory


class FoodCategorySerializer(ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = '__all__'


class FoodSerializer(ModelSerializer):
    category = FoodCategorySerializer()
    comments = SerializerMethodField()

    class Meta:
        model = Food
        fields = '__all__'

    def get_comments(self, obj):
        from orders.serializers import CommentSerializer
        return CommentSerializer(Comment.objects.filter(food=obj), many=True).data
