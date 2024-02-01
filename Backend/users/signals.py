from django.db.models.signals import post_save
from django.dispatch import receiver

from cart.models import Cart

from .models import User


@receiver(post_save, sender=User)
def initial_acccount_signal(sender, instance, *args, **kwargs):
    """
        Create profile object after user created
    """

    created = False

    if 'created' in kwargs:
        if kwargs['created']:
            created = True

    if not created:
        return

    Cart.objects.create(user=instance)
