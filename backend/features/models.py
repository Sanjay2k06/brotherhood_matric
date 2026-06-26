from django.db import models

class FeatureLab(models.Model):
    title = models.CharField(max_length=150, unique=True)
    image = models.URLField(max_length=500, null=True, blank=True)
    description = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
