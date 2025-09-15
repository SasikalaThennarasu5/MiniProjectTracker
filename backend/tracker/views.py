# API views for MiniProject operations using DRF viewsets
from rest_framework import viewsets, permissions, filters, status
from .models import MiniProject
from .serializers import MiniProjectSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class MiniProjectViewSet(viewsets.ModelViewSet):
    queryset = MiniProject.objects.select_related('assigned_to').all().order_by('-created_at')
    serializer_class = MiniProjectSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title','description','assigned_to__username']
    filterset_fields = ['status','priority','due_date','assigned_to__id']

    def get_permissions(self):
        # Trainers are staff users (is_staff). They can create/edit/delete.
        if self.action in ['create','update','partial_update','destroy']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        # For admin-created projects, assigned_to is provided via serializer field assigned_to_id
        serializer.save()
