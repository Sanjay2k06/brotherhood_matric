from django.db import models

class Vacancy(models.Model):
    STATUS_CHOICES = (
        ("Open", "Open"),
        ("Closed", "Closed"),
    )

    title = models.CharField(max_length=200)
    department = models.CharField(max_length=150)
    qualification = models.CharField(max_length=200)
    experience = models.CharField(max_length=100)
    description = models.TextField()
    deadline = models.DateField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default="Open")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.department} ({self.status})"

class JobApplication(models.Model):
    vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE, related_name="applications")
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    resume = models.URLField(max_length=500, help_text="Cloudinary URL to uploaded PDF/Doc resume.")
    cover_letter = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Application: {self.name} for {self.vacancy.title}"
