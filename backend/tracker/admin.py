from django.contrib import admin
from .models import MiniProject

@admin.register(MiniProject)
class MiniProjectAdmin(admin.ModelAdmin):
    list_display = ('title','assigned_to','priority','status','due_date')
    list_filter = ('priority','status')
