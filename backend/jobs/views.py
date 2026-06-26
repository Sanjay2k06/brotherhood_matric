from rest_framework import viewsets, permissions
from core.permissions import IsAdminOrReadOnly, IsContentAdmin
from .models import Vacancy, JobApplication
from .serializers import VacancySerializer, JobApplicationSerializer

class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all().order_by("-created_at")
    serializer_class = VacancySerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        """
        Public users only see 'Open' positions. Authenticated admins see all.
        """
        queryset = super().get_queryset()
        if not (self.request.user and self.request.user.is_authenticated and self.request.user.is_staff):
            queryset = queryset.filter(status="Open")
        return queryset

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all().order_by("-submitted_at")
    serializer_class = JobApplicationSerializer

    def get_permissions(self):
        """
        Allows public users to submit their job applications.
        Restricts viewing/managing applications to Content Admins and Super Admins.
        """
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsContentAdmin()]
