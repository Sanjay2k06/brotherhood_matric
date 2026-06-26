from rest_framework import serializers
from .models import AlumniRegistration, AlumniAchievement

class AlumniRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniRegistration
        fields = "__all__"

class AlumniAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniAchievement
        fields = "__all__"
