from django.db import models


class FoodCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name='دسته بندی')

    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=100, verbose_name='نام')
    category = models.ForeignKey(
        FoodCategory, on_delete=models.CASCADE, verbose_name='دسته بندی')
    price = models.IntegerField(verbose_name='قیمت')
    description = models.TextField(verbose_name='توضیحات')
    image = models.ImageField(upload_to='food', verbose_name='تصویر')
    quantity = models.IntegerField(verbose_name='موجودی')

    def __str__(self):
        return self.name
