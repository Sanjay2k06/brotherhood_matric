import csv
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from core.permissions import IsAdmissionManager
from .models import AdmissionQuery
from .serializers import AdmissionQuerySerializer

class AdmissionQueryViewSet(viewsets.ModelViewSet):
    queryset = AdmissionQuery.objects.all().order_by("-created_at")
    serializer_class = AdmissionQuerySerializer

    def get_permissions(self):
        """
        Public submission is permitted.
        Inspection and modification require Admission Manager permissions.
        """
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsAdmissionManager()]

    @action(detail=False, methods=["get"], url_path="export-csv")
    def export_csv(self, request):
        """
        Exports all admission queries as a downloadable CSV spreadsheet.
        """
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="admission_queries.csv"'

        writer = csv.writer(response)
        writer.writerow([
            "Student Name", "Parent Name", "Phone", "Email", 
            "Class Applied", "Message", "Status", "Created At"
        ])

        queries = AdmissionQuery.objects.all().order_by("-created_at")
        for q in queries:
            writer.writerow([
                q.student_name, q.parent_name, q.phone, q.email, 
                q.class_applied, q.message, q.status, q.created_at
            ])

        return response
