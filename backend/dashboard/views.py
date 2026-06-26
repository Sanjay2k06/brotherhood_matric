from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

# Importing models
from events.models import Event
from admissions.models import AdmissionQuery
from contacts.models import ContactMessage
from jobs.models import JobApplication
from gallery.models import GalleryImage
from teachers.models import Teacher

class AdminDashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Aggregates operational metadata for the administrative stats panels.
        """
        today = timezone.now().date()
        
        # Events calculations
        total_events = Event.objects.count()
        upcoming_events = Event.objects.filter(status="Published", event_date__gt=today).count()
        latest_events = Event.objects.filter(status="Published", event_date__lte=today).count()

        # Queries, applications, feedback messages counters
        total_admission_queries = AdmissionQuery.objects.count()
        new_admission_queries = AdmissionQuery.objects.filter(status="New").count()
        
        total_contact_messages = ContactMessage.objects.count()
        pending_contact_messages = ContactMessage.objects.filter(status="Pending").count()

        total_job_applications = JobApplication.objects.count()
        total_gallery_images = GalleryImage.objects.count()
        total_teachers = Teacher.objects.count()

        stats = {
            "total_events": total_events,
            "upcoming_events": upcoming_events,
            "latest_events": latest_events,
            "admissions": {
                "total": total_admission_queries,
                "new": new_admission_queries,
            },
            "contact_messages": {
                "total": total_contact_messages,
                "pending": pending_contact_messages,
            },
            "job_applications": total_job_applications,
            "gallery_images": total_gallery_images,
            "teachers_count": total_teachers,
        }

        return Response(stats)
