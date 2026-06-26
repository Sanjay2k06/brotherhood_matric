from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from core.permissions import IsAdminOrReadOnly
from .models import GalleryImage
from .serializers import GalleryImageSerializer

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by("-uploaded_at")
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        """
        Supports filtering by category query parameter, e.g. /api/gallery/?category=Sports
        """
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset

    @action(detail=False, methods=["get"], url_path="category/(?P<cat_name>[^/.]+)")
    def category_filter(self, request, cat_name=None):
        """
        Supports fetching by specific URL category route, e.g. /api/gallery/category/Sports/
        """
        images = GalleryImage.objects.filter(category__iexact=cat_name).order_by("-uploaded_at")
        page = self.paginate_queryset(images)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data)
