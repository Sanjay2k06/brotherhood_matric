from rest_framework import viewsets, permissions
from core.permissions import IsAdminOrReadOnly, IsAdmissionManager
from .models import AlumniRegistration, AlumniAchievement
from .serializers import AlumniRegistrationSerializer, AlumniAchievementSerializer

class AlumniRegistrationViewSet(viewsets.ModelViewSet):
    queryset = AlumniRegistration.objects.all().order_by("-created_at")
    serializer_class = AlumniRegistrationSerializer

    def get_permissions(self):
        """
        Allows anyone to submit registration forms.
        Only staff members with Admission Manager status can list or inspect registrations.
        """
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsAdmissionManager()]

class AlumniAchievementViewSet(viewsets.ModelViewSet):
    queryset = AlumniAchievement.objects.all().order_by("-created_at")
    serializer_class = AlumniAchievementSerializer
    permission_classes = [IsAdminOrReadOnly]
