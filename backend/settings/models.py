from django.db import models

class SiteSetting(models.Model):
    school_name = models.CharField(max_length=200, default="Brotherhood Matriculation Hr. Sec. School")
    logo = models.URLField(max_length=500, null=True, blank=True)
    address = models.TextField(default="Neelankarai, Chennai")
    phone = models.CharField(max_length=50, default="044-2440133")
    email = models.EmailField(default="info@brotherhoodschool.edu.in")
    social_links = models.JSONField(default=dict, blank=True, help_text="e.g. {'facebook': 'url', 'twitter': 'url'}")
    footer_content = models.TextField(default="Shaping Future Leaders Since 1991.")
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.school_name
