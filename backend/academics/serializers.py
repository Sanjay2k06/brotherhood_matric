from rest_framework import serializers
from .models import AcademicsContent

class AcademicsContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicsContent
        fields = "__all__"
