from django.db import models

class ContactMessage(models.Model):
    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Replied", "Replied"),
    )

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}: {self.subject} ({self.status})"
