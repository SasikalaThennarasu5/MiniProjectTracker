from rest_framework import routers
from django.urls import path, include
from .views import MiniProjectViewSet

router = routers.DefaultRouter()
router.register(r'mini-projects', MiniProjectViewSet, basename='mini-project')

urlpatterns = [
    path('', include(router.urls)),
]
