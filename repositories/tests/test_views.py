from unittest import mock
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from .fixtures import github
from .factories.models import GitHubProfileFactory


User = get_user_model()


@mock.patch.multiple(
    "repositories.github",
    list_repos=mock.DEFAULT,
    get_repo=mock.DEFAULT,
    list_commits=mock.DEFAULT,
)
class RepositoryViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test_user", password="test_user")
        self.profile = GitHubProfileFactory(user=self.user)

    def test_add_repository(self, list_repos, get_repo, list_commits):
        list_repos.return_value = github.list_repositories.get_dict()
        get_repo.return_value = github.get_repository.get_dict()
        list_commits.return_value = github.list_commits.get_dict()
        url = reverse("repositories:repositories-list")
        data = {"full_name": "testuser/testrepo"}

        self.client.login(username="test_user", password="test_user")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
