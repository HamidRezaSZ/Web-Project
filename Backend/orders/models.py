from django.db import models

from cart.models import Cart


class OrderStatus(models.Model):
    title = models.CharField(max_length=50, verbose_name='عنوان')

    def __str__(self):
        return self.title


class Order(models.Model):
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, verbose_name='کاربر')
    total_price = models.IntegerField(verbose_name='قیمت کل')
    discount_amount = models.IntegerField(
        verbose_name='مقدار تخفیف', default=0)
    is_delivered = models.BooleanField(
        default=False, verbose_name='تحویل داده شده؟')
    coupon_code = models.CharField(
        max_length=200, blank=True, null=True, verbose_name='کد تخفیف')
    status = models.ForeignKey(
        OrderStatus, on_delete=models.CASCADE, verbose_name='وضعیت')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='تاریخ سفارش')

    def __str__(self):
        return f'{self.user} - {self.total_price} - {self.status}'

    def save(self, *args, **kwargs) -> None:
        cart_obj = Cart.objects.get_or_create(user=self.user)
        self.total_price = cart_obj.get_cart_price()
        super().save()
        for item in cart_obj.cartitem_set.all():
            OrderItem.objects.create(
                order=self, food=item.food, quantity=item.quantity)
        cart_obj.cartitem_set.filter().delete()

    def get_order_price(self) -> int:
        return sum([item.get_order_item_price() for item in self.orderitem_set.all()])


class OrderItem(models.Model):
    order = models.ForeignKey(
        'Order', on_delete=models.CASCADE, verbose_name='سفارش')
    food = models.ForeignKey(
        'food.Food', on_delete=models.CASCADE, verbose_name='غذا')
    quantity = models.IntegerField(verbose_name='تعداد')

    def __str__(self):
        return f'{self.quantity} عدد {self.food} در {self.order}'

    def get_order_item_price(self) -> int:
        return self.food.price * self.quantity


class Comment(models.Model):
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, verbose_name='پاسخ', null=True, blank=True, related_name='child')
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, verbose_name='کاربر')
    order = models.ForeignKey(
        'Order', on_delete=models.CASCADE, verbose_name='سفارش', null=True, blank=True)
    text = models.TextField(verbose_name='متن')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='تاریخ سفارش')
    score = models.IntegerField(verbose_name='امتیاز', null=True, blank=True)

    def __str__(self):
        return f'{self.user} - {self.order} - {self.text}'


class Discount(models.Model):
    code = models.CharField(max_length=50, verbose_name='کد تخفیف')
    percent = models.IntegerField(
        verbose_name='درصد تخفیف', null=True, blank=True)
    discount = models.IntegerField(
        verbose_name='مقدار تخفیف', null=True, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='تاریخ ایجاد')
    expire_at = models.DateTimeField(verbose_name='تاریخ انقضا')

    def clean(self) -> None:
        if (not self.percent and not self.discount) or (self.percent and self.discount):
            raise ValueError(
                'فقط یکی از درصد یا مقدار تخفیف باید مقدار داشته باشد')

        return super().clean()

    def __str__(self):
        return f'{self.code} - {self.percent} - {self.discount}'
