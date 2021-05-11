from django.contrib import admin
from .models import Challenge, Submission

# Register your models here.
admin.site.register([Challenge, Submission])
