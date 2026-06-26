from rest_framework import permissions

class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            (request.user.role == "Super Admin" or request.user.is_superuser)
        )

class IsContentAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            (request.user.role in ["Super Admin", "Content Admin"] or request.user.is_superuser)
        )

class IsEventManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            (request.user.role in ["Super Admin", "Event Manager"] or request.user.is_superuser)
        )

class IsAdmissionManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            (request.user.role in ["Super Admin", "Admission Manager"] or request.user.is_superuser)
        )

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allows read-only access to any request,
    but write actions require Super Admin or Content Admin role.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(
            request.user and 
            request.user.is_authenticated and 
            (request.user.role in ["Super Admin", "Content Admin"] or request.user.is_superuser)
        )
