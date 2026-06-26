from rest_framework import viewsets
from rest_framework.response import Response
from core.permissions import IsAdminOrReadOnly
from .models import SiteSetting
from .serializers import SiteSettingSerializer

class SiteSettingViewSet(viewsets.ModelViewSet):
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer
    permission_classes = [IsAdminOrReadOnly]

    def list(self, request, *args, **kwargs):
        """
        Retrieves or initializes the singleton site settings record.
        """
        site_settings, created = SiteSetting.objects.get_or_create(id=1)
        serializer = self.get_serializer(site_settings)
        return Response(serializer.data)
