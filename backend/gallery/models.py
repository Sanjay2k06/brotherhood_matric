from django.db import models

class GalleryImage(models.Model):
    CATEGORY_CHOICES = (
        ("Sports", "Sports"),
        ("Events", "Events"),
        ("Celebrations", "Celebrations"),
        ("Academics", "Academics"),
    )

    image = models.URLField(max_length=500)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=150, blank=True)
    description = models.CharField(max_length=250, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category}: {self.title or self.id}"
