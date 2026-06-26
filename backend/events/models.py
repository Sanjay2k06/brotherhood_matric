from django.db import models
from django.utils import timezone

class Event(models.Model):
    CATEGORY_CHOICES = (
        ("Sports", "Sports"),
        ("Academic", "Academic"),
        ("Cultural", "Cultural"),
        ("Annual Day", "Annual Day"),
        ("Celebration", "Celebration"),
        ("Competition", "Competition"),
    )
    STATUS_CHOICES = (
        ("Published", "Published"),
        ("Draft", "Draft"),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    cover_image = models.URLField(max_length=500, null=True, blank=True)
    # Storing multiple gallery images as a list of URLs
    gallery_images = models.JSONField(default=list, blank=True)
    event_date = models.DateField(default=timezone.localdate)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default="Academic")
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default="Published")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.category} - {self.event_date})"
