from rest_framework import permissions


class HasGitHubProfilePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and hasattr(request.user, "github_profile")
