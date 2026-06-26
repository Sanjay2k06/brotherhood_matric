from rest_framework import viewsets
from core.permissions import IsAdminOrReadOnly
from .models import StudentAchievement, SchoolUniform, StudentHouse, StudentLeader
from .serializers import (
    StudentAchievementSerializer,
    SchoolUniformSerializer,
    StudentHouseSerializer,
    StudentLeaderSerializer,
)

class StudentAchievementViewSet(viewsets.ModelViewSet):
    queryset = StudentAchievement.objects.all().order_by("-achievement_date")
    serializer_class = StudentAchievementSerializer
    permission_classes = [IsAdminOrReadOnly]

class SchoolUniformViewSet(viewsets.ModelViewSet):
    queryset = SchoolUniform.objects.all().order_by("id")
    serializer_class = SchoolUniformSerializer
    permission_classes = [IsAdminOrReadOnly]

class StudentHouseViewSet(viewsets.ModelViewSet):
    queryset = StudentHouse.objects.all().order_by("id")
    serializer_class = StudentHouseSerializer
    permission_classes = [IsAdminOrReadOnly]

class StudentLeaderViewSet(viewsets.ModelViewSet):
    queryset = StudentLeader.objects.all().order_by("id")
    serializer_class = StudentLeaderSerializer
    permission_classes = [IsAdminOrReadOnly]
