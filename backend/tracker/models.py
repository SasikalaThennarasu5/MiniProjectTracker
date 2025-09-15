from django.db import models
from django.contrib.auth.models import User

PRIORITY_CHOICES = [('low','Low'),('medium','Medium'),('high','High')]
STATUS_CHOICES = [('todo','To Do'),('inprogress','In Progress'),('done','Done')]

class MiniProject(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    assigned_to = models.ForeignKey(User, related_name='mini_projects', on_delete=models.CASCADE)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} ({self.assigned_to.username})'
