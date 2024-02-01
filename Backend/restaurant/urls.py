from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register(r'restaurants', RestaurantView)
router.register(r'categories', RestaurantCategoryView)

urlpatterns = [

] + router.urls
