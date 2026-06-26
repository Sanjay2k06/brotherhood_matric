from rest_framework import serializers
from .models import FeatureLab

class FeatureLabSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureLab
        fields = "__all__"
