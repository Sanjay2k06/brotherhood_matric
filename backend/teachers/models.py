from django.db import models

class Teacher(models.Model):
    SUBJECT_CHOICES = (
        ("English", "English"),
        ("Mathematics", "Mathematics"),
        ("Science", "Science"),
        ("Languages", "Languages"),
        ("Computer Science", "Computer Science"),
    )

    name = models.CharField(max_length=150)
    designation = models.CharField(max_length=150)
    subject = models.CharField(max_length=40, choices=SUBJECT_CHOICES)
    qualification = models.CharField(max_length=200)
    image = models.URLField(max_length=500, null=True, blank=True)
    experience = models.CharField(max_length=50)
    description = models.TextField(blank=True, help_text="Short bio and educational philosophy.")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.subject})"
