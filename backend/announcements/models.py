from django.db import models
from django.utils import timezone

class Announcement(models.Model):
    PRIORITY_CHOICES = (
        ("High", "High"),
        ("Medium", "Medium"),
        ("Low", "Low"),
    )
    STATUS_CHOICES = (
        ("Active", "Active"),
        ("Draft", "Draft"),
        ("Scheduled", "Scheduled"),
    )

    title = models.CharField(max_length=200)
    message = models.TextField()
    priority = models.CharField(max_length=15, choices=PRIORITY_CHOICES, default="Medium")
    start_date = models.DateField(default=timezone.localdate)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default="Active")
    show_in_popup = models.BooleanField(default=False)
    show_in_alert_bar = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.priority})"
