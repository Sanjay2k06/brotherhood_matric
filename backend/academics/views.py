from rest_framework import viewsets
from core.permissions import IsAdminOrReadOnly
from .models import AcademicsContent
from .serializers import AcademicsContentSerializer

class AcademicsContentViewSet(viewsets.ModelViewSet):
    queryset = AcademicsContent.objects.all().order_by("key")
    serializer_class = AcademicsContentSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "key"
