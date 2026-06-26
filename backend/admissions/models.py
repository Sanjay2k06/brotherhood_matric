from django.db import models

class AdmissionQuery(models.Model):
    STATUS_CHOICES = (
        ("New", "New"),
        ("Contacted", "Contacted"),
        ("Admitted", "Admitted"),
        ("Closed", "Closed"),
    )

    student_name = models.CharField(max_length=150)
    parent_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    class_applied = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="New")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query: {self.student_name} (Class: {self.class_applied})"
