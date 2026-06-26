from django.db import models
from django.utils import timezone

class StudentAchievement(models.Model):
    title = models.CharField(max_length=200)
    image = models.URLField(max_length=500, null=True, blank=True)
    description = models.TextField()
    achievement_date = models.DateField(default=timezone.localdate)

    def __str__(self):
        return self.title

class SchoolUniform(models.Model):
    section = models.CharField(max_length=100) # e.g. Primary (I to V), Secondary (VI to XII)
    boys_uniform = models.TextField()
    girls_uniform = models.TextField()

    def __str__(self):
        return self.section

class StudentHouse(models.Model):
    name = models.CharField(max_length=50) # Red House, Blue House...
    motto = models.CharField(max_length=100)
    color_code = models.CharField(max_length=20) # bg-red-500, etc.
    description = models.TextField()
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class StudentLeader(models.Model):
    role = models.CharField(max_length=100) # Head Boy, Captain...
    name = models.CharField(max_length=150)
    grade = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.role}: {self.name}"
