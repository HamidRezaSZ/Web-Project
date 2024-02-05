from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    first_name = models.CharField(_("نام"), max_length=150)
    last_name = models.CharField(
        _("نام خوانوادگی"), max_length=150)
    gender = models.CharField(_("جنسیت"), max_length=150)
    phone_number = models.CharField(
        _("شماره تلفن"), max_length=11)
    balance = models.IntegerField(_("موجودی"), default=0)
    birth_date = models.DateField(_("تاریخ تولد"), null=True, blank=True)
    national_code = models.CharField(_("کد ملی"), max_length=10)
    address = models.CharField(_("آدرس"), max_length=150)
