from rest_framework.serializers import ModelSerializer

from .models import Food, FoodCategory


class FoodCategorySerializer(ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = '__all__'


class FoodSerializer(ModelSerializer):
    category = FoodCategorySerializer()

    class Meta:
        model = Food
        fields = '__all__'
