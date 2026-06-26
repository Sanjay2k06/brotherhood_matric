from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsContentAdmin
from .storage import upload_file_to_storage

class MediaUploadView(APIView):
    permission_classes = [IsAuthenticated, IsContentAdmin]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get("file")
        if not file_obj:
            return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Uploading to dynamic folder based on request param or default
        folder = request.data.get("folder", "school_uploads")
        try:
            file_url = upload_file_to_storage(file_obj, folder=folder)
            return Response({
                "url": file_url,
                "name": file_obj.name,
                "size": file_obj.size
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
