from rest_framework import viewsets, permissions
from core.permissions import IsContentAdmin
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by("-created_at")
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        """
        Public submissions are open.
        Review and management require Content Admin roles.
        """
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsContentAdmin()]
