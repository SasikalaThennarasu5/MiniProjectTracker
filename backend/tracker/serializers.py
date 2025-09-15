from rest_framework import serializers
from .models import MiniProject
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','is_staff']

class MiniProjectSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=User.objects.all(), source='assigned_to')

    class Meta:
        model = MiniProject
        fields = ['id','title','description','assigned_to','assigned_to_id','priority','status','due_date','created_at']
