from rest_framework import serializers
from .models import ManagementProfile

class ManagementProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagementProfile
        fields = "__all__"
