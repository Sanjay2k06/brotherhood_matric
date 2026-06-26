from rest_framework import viewsets
from core.permissions import IsAdminOrReadOnly
from .models import ManagementProfile
from .serializers import ManagementProfileSerializer

class ManagementProfileViewSet(viewsets.ModelViewSet):
    queryset = ManagementProfile.objects.all().order_by("role_key")
    serializer_class = ManagementProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "role_key"
