import datetime
from django.test import TestCase
from repositories.models import GitHubProfile, Repository, Commit
from repositories.serializers import (
    RepositorySerializer,
    CommitSerializer,
    GitHubProfileSerializer,
)


class GitHubProfileSerializerTests(TestCase):
    def setUp(self):
        self.profile_attributes = {
            "github_id": 123,
            "name": "Monalisa Octocat",
            "username": "octocat",
            "avatar": "https://avatars.githubusercontent.com/u/2223733?v=4",
            "url": "https://github.com/andreneto",
        }

        self.instance = GitHubProfile(**self.profile_attributes)
        self.serializer = GitHubProfileSerializer(instance=self.instance)

    def test_has_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(["name", "username", "avatar", "url"]))


class RepositorySerializerTests(TestCase):
    def setUp(self):
        profile_attributes = {
            "github_id": 123,
            "name": "Monalisa Octocat",
            "username": "octocat",
            "avatar": "https://avatars.githubusercontent.com/u/2223733?v=4",
            "url": "https://github.com/octocat",
        }
        owner = GitHubProfile.objects.create(**profile_attributes)

        self.repository_attributes = {
            "owner": owner,
            "name": "TestRepo",
            "github_id": 123,
            "description": "",
        }
        self.instance = Repository(**self.repository_attributes)
        self.serializer = RepositorySerializer(instance=self.instance)

    def test_has_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(["owner", "name", "description"]))


class CommitSerializerTests(TestCase):
    def setUp(self):
        profile_attributes = {
            "github_id": 124,
            "name": "Monalisa Octocat",
            "username": "octocat",
            "avatar": "https://avatars.githubusercontent.com/u/2223733?v=4",
            "url": "https://github.com/octocat",
        }
        github_profile = GitHubProfile.objects.create(**profile_attributes)

        repository_attributes = {
            "owner": github_profile,
            "name": "TestRepo",
            "github_id": 123,
            "description": "",
        }
        repository = Repository.objects.create(**repository_attributes)

        self.commit_attributes = {
            "message": "Fix all the bugs",
            "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
            "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
            "author_name": "Monalisa Octocat",
            "author_email": "octocat@github.com",
            "authored_at": datetime.datetime.now(),
            "author_profile": github_profile,
            "committer_name": "Monalisa Octocat",
            "committer_email": "octocat@github.com",
            "committed_at": datetime.datetime.now(),
            "committer_profile": github_profile,
            "repository": repository,
        }
        self.instance = Commit(**self.commit_attributes)
        self.serializer = CommitSerializer(instance=self.instance)

    def test_has_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(
            set(data.keys()),
            set(
                [
                    "message",
                    "sha",
                    "url",
                    "author_name",
                    "author_email",
                    "author_email",
                    "authored_at",
                    "author_profile",
                    "committer_name",
                    "committer_email",
                    "committed_at",
                    "committer_profile",
                    "repository",
                ]
            ),
        )
