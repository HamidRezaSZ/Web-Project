from django.contrib import admin

from .models import Food, FoodCategory


@admin.register(FoodCategory)
class FoodCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Food)
class FoodCategory(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)
