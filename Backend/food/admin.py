from django.contrib import admin

from orders.models import Comment

from .models import Food, FoodCategory


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0


@admin.register(FoodCategory)
class FoodCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)
    inlines = (CommentInline,)
