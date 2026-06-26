from django.db import models

class CoCurricularActivity(models.Model):
    KEY_CHOICES = (
        ("sports", "Sports"),
        ("choir", "Choir"),
        ("eco-club", "Eco Club"),
        ("literary-association", "Literary Association"),
        ("rsp", "Road Safety Patrol (RSP)"),
        ("scouts-guides", "Scouts & Guides"),
    )

    key = models.CharField(max_length=30, choices=KEY_CHOICES, unique=True)
    title = models.CharField(max_length=200)
    image = models.URLField(max_length=500, null=True, blank=True)
    description = models.TextField()
    achievements = models.TextField(blank=True, help_text="Major achievements of this club/activity.")
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_key_display()} ({self.title})"
