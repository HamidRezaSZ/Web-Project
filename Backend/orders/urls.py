from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register(r'comments', CommentView)
router.register(r'status', OrderStautsView)
router.register(r'orders', OrderView, basename='orders')

urlpatterns = [

] + router.urls
