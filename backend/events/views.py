from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from core.permissions import IsAdminOrReadOnly
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("-event_date")
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, methods=["get"])
    def latest(self, request):
        """
        Returns published events that have already occurred or are current, sorted newest first.
        """
        today = timezone.now().date()
        events = Event.objects.filter(status="Published", event_date__lte=today).order_by("-event_date")
        page = self.paginate_queryset(events)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def upcoming(self, request):
        """
        Returns published events scheduled in the future, sorted closest first.
        """
        today = timezone.now().date()
        events = Event.objects.filter(status="Published", event_date__gt=today).order_by("event_date")
        page = self.paginate_queryset(events)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
