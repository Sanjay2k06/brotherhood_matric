from rest_framework import viewsets
from core.permissions import IsAdminOrReadOnly
from .models import CoCurricularActivity
from .serializers import CoCurricularActivitySerializer

class CoCurricularActivityViewSet(viewsets.ModelViewSet):
    queryset = CoCurricularActivity.objects.all().order_by("key")
    serializer_class = CoCurricularActivitySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "key"
