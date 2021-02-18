from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters import rest_framework as filters

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
        return self.request.user.github_profile.repositories.all()

    def perform_destroy(self, instance):
        return RepositoryService.remove_repository(instance)


class CommitViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = CommitSerializer
    permission_classes = [IsAuthenticated, HasGitHubProfilePermission]
    pagination_class = StandardPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ("author_email", "repository")

    def get_queryset(self):
        repo_ids = self.request.user.github_profile.repositories.values_list(
            "commits__id", flat=True
        )
        return Commit.objects.filter(id__in=repo_ids)