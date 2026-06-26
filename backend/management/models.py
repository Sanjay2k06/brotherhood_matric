from django.db import models

class ManagementProfile(models.Model):
    ROLE_CHOICES = (
        ("founder_message", "Founder Message"),
        ("father_cruze", "Father Anton Cruze Profile"),
        ("principal_message", "Principal Message"),
        ("committee", "Managing Committee"),
    )

    role_key = models.CharField(max_length=30, choices=ROLE_CHOICES, unique=True)
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    image = models.URLField(max_length=500, null=True, blank=True)
    description = models.TextField(help_text="Detailed profile text or message.")
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_role_key_display()} ({self.name})"
