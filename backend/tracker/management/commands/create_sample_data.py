from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from tracker.models import MiniProject
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Create sample users and mini projects'

    def handle(self, *args, **options):
        # Create trainer (staff) and trainees
        trainer, _ = User.objects.get_or_create(username='trainer', defaults={'email':'trainer@example.com','is_staff':True})
        t1, _ = User.objects.get_or_create(username='alice', defaults={'email':'alice@example.com'})
        t2, _ = User.objects.get_or_create(username='bob', defaults={'email':'bob@example.com'})

        # Create sample projects
        MiniProject.objects.all().delete()
        MiniProject.objects.create(title='Build Calculator', description='Simple calculator app using React', assigned_to=t1, priority='high', status='inprogress', due_date=date.today()+timedelta(days=7))
        MiniProject.objects.create(title='API Integration', description='Connect frontend to backend using Axios', assigned_to=t1, priority='medium', status='todo', due_date=date.today()+timedelta(days=10))
        MiniProject.objects.create(title='UI Polish', description='Improve Tailwind styling', assigned_to=t2, priority='low', status='todo', due_date=date.today()+timedelta(days=5))

        self.stdout.write(self.style.SUCCESS('Sample users and mini projects created.'))
