from rest_framework import viewsets
from core.permissions import IsAdminOrReadOnly
from .models import FeatureLab
from .serializers import FeatureLabSerializer

class FeatureLabViewSet(viewsets.ModelViewSet):
    queryset = FeatureLab.objects.all().order_by("id")
    serializer_class = FeatureLabSerializer
    permission_classes = [IsAdminOrReadOnly]
