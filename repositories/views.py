from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Commit, Repository, GitHubProfile
from .serializers import CommitSerializer, RepositorySerializer
from .services import RepositoryService
from .permissions import HasGitHubProfilePermission
from .pagination import StandardPagination


class RepositoryViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = RepositorySerializer
    permission_classes = [IsAuthenticated, HasGitHubProfilePermission]
    pagination_class = StandardPagination

    @action(detail=True)
    def commits(self, request, pk=None):
        repository = self.get_object()
        commits = repository.commits.objects.all()
        serializer = CommitSerializer(commits, many=True)

        if serializer.is_valid():
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        return self.request.user.github_profile.repositories

    def perform_destroy(self, instance):
        return RepositoryService.remove_repository(instance)
