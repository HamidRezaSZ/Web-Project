from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import User


class Cart(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, verbose_name=_('کاربر'))

    def __str__(self) -> str:
        return self.user.username

    def get_cart_price(self) -> int:
        return sum([item.get_cart_item_price() for item in self.cartitem_set.all()])


class CartItem(models.Model):
    cart = models.ForeignKey(to=Cart, verbose_name=_(
        'سبد خرید'), on_delete=models.CASCADE)
    food = models.ForeignKey(
        to='food.Food', verbose_name=_('غذا'), on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(
        default=1, verbose_name=_('تعداد'))

    def __str__(self) -> str:
        return f'{self.food}'

    def save(self, *args, **kwargs) -> None:
        if self.food.quantity < self.quantity:
            raise ValidationError('غذا به اندازه کافی موجود نیست')
        return super().save(*args, **kwargs)

    def get_cart_item_price(self) -> int:
        return self.food.price * self.quantity
