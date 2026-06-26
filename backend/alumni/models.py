from django.db import models

class AlumniRegistration(models.Model):
    name = models.CharField(max_length=150)
    batch = models.IntegerField(help_text="Year of Passing, e.g. 2012")
    email = models.EmailField()
    profession = models.CharField(max_length=150, blank=True)
    organization = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=20)
    remarks = models.TextField(blank=True, help_text="Special remarks or memory shares.")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (Batch: {self.batch})"

class AlumniAchievement(models.Model):
    name = models.CharField(max_length=150)
    batch = models.IntegerField()
    profession = models.CharField(max_length=150)
    description = models.TextField()
    image = models.URLField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Alumni Success: {self.name}"
