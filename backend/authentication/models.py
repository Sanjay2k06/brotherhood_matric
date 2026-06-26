from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ("Super Admin", "Super Admin"),
        ("Content Admin", "Content Admin"),
        ("Event Manager", "Event Manager"),
        ("Admission Manager", "Admission Manager"),
    )
    
    role = models.CharField(
        max_length=30, 
        choices=ROLE_CHOICES, 
        default="Content Admin"
    )
    
    def __str__(self):
        return f"{self.username} ({self.role})"
