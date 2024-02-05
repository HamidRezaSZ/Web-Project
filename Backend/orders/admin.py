from django.contrib import admin

from .models import Comment, Discount, Order, OrderItem, OrderStatus


@admin.register(OrderStatus)
class OrderStatusAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_price',
                    'discount_amount', 'status', 'created_at')
    list_display = ('user', 'total_price',
                    'discount_amount', 'status', 'created_at')
    list_filter = ('user', 'status', 'created_at')
    inlines = (OrderItemInline,)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'text', 'created_at')
    list_filter = ('user', 'created_at')


@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('code', 'percent', 'discount')
    search_fields = ('code',)
