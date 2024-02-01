from django.contrib import admin

from .models import Restaurant, RestaurantCategory


@admin.register(RestaurantCategory)
class RestaurantCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'address', 'phone_number')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)
