from unittest import mock
from django.test import TestCase
from repositories import services, models as repo_models


@mock.patch.multiple(
    "repositories.services.RepositoryService",
    _fetch_repository_data=mock.DEFAULT,
    _fetch_repository_commits=mock.DEFAULT,
)
class RepositoryServiceTests(TestCase):
    def setUp(self):
        self.repository_attributes = {"username": "repo_owner", "repo_name": "foobar"}
        self.fetched_repository = {
            "id": 1234,
            "name": "Test repository",
            "url": "https://api.github.com/repos/testuser/test_repository",
            "owner": {
                "login": "testuser",
                "id": 537,
                "avatar_url": "https://avatars.githubusercontent.com/u/2223772?v=4",
                "html_url": "https://github.com/testuser",
            },
        }
        self.fetched_commits = [
            {
                "sha": "547d2520ff97fadc1724915b43199df2585280c9",
                "commit": {
                    "author": {
                        "name": "Test author",
                        "email": "author@test.com",
                        "date": "2021-01-12T01:14:51Z",
                    },
                    "committer": {
                        "name": "Test committer",
                        "email": "committer@test.com",
                        "date": "2021-01-13T01:14:51Z",
                    },
                    "message": "Add new function",
                    "url": "https://api.github.com/repos/testuser/test_repo/commits/547d2520ff97fadc1724915b43199df2585280123",
                },
            },
            {
                "sha": "547d2520ff97fadc1724915b43199df258528045",
                "commit": {
                    "author": {
                        "name": "Test author",
                        "email": "author@test.com",
                        "date": "2021-01-27T01:14:51Z",
                    },
                    "committer": {
                        "name": "Test committer",
                        "email": "committer@test.com",
                        "date": "2021-01-28T01:14:51Z",
                    },
                    "message": "Refactor last function new function",
                    "url": "https://api.github.com/repos/testuser/test_repo/commits/547d2520ff97fadc1724915b43199df2585280123",
                },
            },
        ]

    def test_add_repository_returns_repository_type(
        self, _fetch_repository_data, _fetch_repository_commits
    ):
        _fetch_repository_data.return_value = self.fetched_repository
        _fetch_repository_commits.return_value = self.fetched_commits
        instance = services.RepositoryService.add_repository(
            **self.repository_attributes
        )

        self.assertIsInstance(instance, repo_models.Repository)
