from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User


# Create your models here.
class Challenge(models.Model):
    LANGUAGE_CHOICES = [
        ("c", "c"),
        ("c++", "c++"),
        ("java", "java"),
        ("javascript", "javascript"),
        ("python", "python"),
    ]
    title = models.CharField(max_length=100)
    description = models.TextField()
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES)
    starter_code = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='challenges')

    def __str__(self):
        return self.title


class Submission(models.Model):
    date_submitted = models.DateTimeField(null=True, blank=True)
    student_names = ArrayField(models.CharField(
        max_length=100, blank=True))
    # Requires something from front-end
    solution = models.TextField(default='Default')
    url = models.URLField()
    is_locked = models.BooleanField(default=False)
    challenge = models.ForeignKey(
        Challenge, on_delete=models.CASCADE, related_name='submissions')
