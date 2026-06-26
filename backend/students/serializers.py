from rest_framework import serializers
from .models import StudentAchievement, SchoolUniform, StudentHouse, StudentLeader

class StudentAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAchievement
        fields = "__all__"

class SchoolUniformSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolUniform
        fields = "__all__"

class StudentHouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentHouse
        fields = "__all__"

class StudentLeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentLeader
        fields = "__all__"
