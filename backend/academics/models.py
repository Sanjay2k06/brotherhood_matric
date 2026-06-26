from django.db import models

class AcademicsContent(models.Model):
    KEY_CHOICES = (
        ("admission", "Admission Process"),
        ("courses", "Courses Offered"),
        ("curriculum", "Curriculum Details"),
        ("fees", "School Fees"),
        ("timings", "School Timings"),
    )

    key = models.CharField(max_length=30, choices=KEY_CHOICES, unique=True)
    title = models.CharField(max_length=200)
    content = models.TextField(help_text="HTML or Markdown contents for the academic subsection.")
    # Storing supplementary configuration data
    metadata = models.JSONField(default=dict, blank=True, help_text="Additional structured fields.")
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_key_display()} ({self.title})"
