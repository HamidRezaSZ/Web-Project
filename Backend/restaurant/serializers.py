from rest_framework.serializers import ModelSerializer

from food.serializers import FoodSerializer

from .models import Restaurant, RestaurantCategory


class RestaurantCategorySerializer(ModelSerializer):
    class Meta:
        model = RestaurantCategory
        fields = '__all__'


class AllRestaurantSerializer(ModelSerializer):
    category = RestaurantCategorySerializer()

    class Meta:
        model = Restaurant
        exclude = ('foods',)


class RestaurantItemSerializer(ModelSerializer):
    category = RestaurantCategorySerializer()
    foods = FoodSerializer(many=True)

    class Meta:
        model = Restaurant
        fields = '__all__'
