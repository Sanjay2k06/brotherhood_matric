from rest_framework import serializers
from .models import AdmissionQuery

class AdmissionQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = AdmissionQuery
        fields = "__all__"
