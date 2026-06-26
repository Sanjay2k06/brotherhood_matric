from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from core.permissions import IsAdminOrReadOnly
from .models import Announcement
from .serializers import AnnouncementSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all().order_by("-created_at")
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAdminOrReadOnly]
