from rest_framework import permissions

class IsMD(permissions.BasePermission):
    """
    Allows access only to Managing Director.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'MD')

class IsHR(permissions.BasePermission):
    """
    Allows access only to HR.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'HR')

class IsManager(permissions.BasePermission):
    """
    Allows access only to Manager.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'Manager')

class IsTeamLead(permissions.BasePermission):
    """
    Allows access only to Team Lead.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'TeamLead')

class IsEmployee(permissions.BasePermission):
    """
    Allows access only to Employee.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'Employee')

class IsMDoOrHR(permissions.BasePermission):
    """
    Allows access to MD or HR.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and 
            request.user.role in ['MD', 'HR']
        )
