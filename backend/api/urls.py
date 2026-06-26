from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

# ViewSets and custom View imports
from authentication.views import UserProfileView, CustomTokenObtainPairView
from dashboard.views import AdminDashboardStatsView
from announcements.views import AnnouncementViewSet
from events.views import EventViewSet
from academics.views import AcademicsContentViewSet
from management.views import ManagementProfileViewSet
from teachers.views import TeacherViewSet
from students.views import (
    StudentAchievementViewSet,
    SchoolUniformViewSet,
    StudentHouseViewSet,
    StudentLeaderViewSet,
)
from alumni.views import AlumniRegistrationViewSet, AlumniAchievementViewSet
from activities.views import CoCurricularActivityViewSet
from gallery.views import GalleryImageViewSet
from features.views import FeatureLabViewSet
from admissions.views import AdmissionQueryViewSet
from jobs.views import VacancyViewSet, JobApplicationViewSet
from contacts.views import ContactMessageViewSet
from settings.views import SiteSettingViewSet
from media_manager.views import MediaUploadView

router = DefaultRouter()
router.register(r"announcements", AnnouncementViewSet, basename="announcements")
router.register(r"events", EventViewSet, basename="events")
router.register(r"academics", AcademicsContentViewSet, basename="academics")
router.register(r"management", ManagementProfileViewSet, basename="management")
router.register(r"teachers", TeacherViewSet, basename="teachers")
router.register(r"student-achievements", StudentAchievementViewSet, basename="student-achievements")
router.register(r"school-uniforms", SchoolUniformViewSet, basename="school-uniforms")
router.register(r"student-houses", StudentHouseViewSet, basename="student-houses")
router.register(r"student-leaders", StudentLeaderViewSet, basename="student-leaders")
router.register(r"alumni-registrations", AlumniRegistrationViewSet, basename="alumni-registrations")
router.register(r"alumni-achievements", AlumniAchievementViewSet, basename="alumni-achievements")
router.register(r"co-curricular-activities", CoCurricularActivityViewSet, basename="co-curricular-activities")
router.register(r"gallery-images", GalleryImageViewSet, basename="gallery-images")
router.register(r"feature-labs", FeatureLabViewSet, basename="feature-labs")
router.register(r"admission-queries", AdmissionQueryViewSet, basename="admission-queries")
router.register(r"vacancies", VacancyViewSet, basename="vacancies")
router.register(r"job-applications", JobApplicationViewSet, basename="job-applications")
router.register(r"contact-messages", ContactMessageViewSet, basename="contact-messages")
router.register(r"site-settings", SiteSettingViewSet, basename="site-settings")

urlpatterns = [
    path("", include(router.urls)),
    
    # Token Authentication
    path("auth/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/profile/", UserProfileView.as_view(), name="user_profile"),
    
    # Dashboard API
    path("dashboard/stats/", AdminDashboardStatsView.as_view(), name="admin_dashboard_stats"),
    
    # Media Upload API
    path("media/upload/", MediaUploadView.as_view(), name="media_upload"),
]
