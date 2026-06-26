from rest_framework import viewsets
from core.permissions import IsAdminOrReadOnly
from .models import Teacher
from .serializers import TeacherSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all().order_by("name")
    serializer_class = TeacherSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        """
        Supports optional subject and name filters.
        """
        queryset = super().get_queryset()
        subject = self.request.query_params.get("subject")
        search = self.request.query_params.get("search")

        if subject:
            queryset = queryset.filter(subject=subject)
        if search:
            queryset = queryset.filter(name__icontains=search)
            
        return queryset
