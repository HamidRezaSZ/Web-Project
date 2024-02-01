from django.db import models


class RestaurantCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name='دسته بندی')

    def __str__(self):
        return self.name


class Restaurant(models.Model):
    name = models.CharField(max_length=100, verbose_name='نام')
    address = models.CharField(max_length=100, verbose_name='آدرس')
    phone_number = models.CharField(max_length=20, verbose_name='شماره تلفن')
    delivery_price = models.IntegerField(verbose_name='هزینه ارسال')
    is_open = models.BooleanField(default=True, verbose_name='باز است؟')
    description = models.TextField(verbose_name='توضیحات')
    category = models.ForeignKey(
        RestaurantCategory, on_delete=models.CASCADE, verbose_name='دسته بندی')
    foods = models.ManyToManyField(
        'food.Food', verbose_name='غذاها', blank=True)

    def __str__(self):
        return self.name
