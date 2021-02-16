from django.db.models import fields
from rest_framework import serializers
from .models import Commit, Repository, GitHubProfile


class GitHubProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GitHubProfile
        fields = ("name", "username", "avatar", "url")


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ("owner", "name", "description")


class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.StringRelatedField(many=False)

    class Meta:
        model = Commit
        fields = (
            "message",
            "sha",
            "url",
            "author_name",
            "author_email",
            "authored_at",
            "author_profile",
            "committer_name",
            "committer_email",
            "committed_at",
            "committer_profile",
            "repository",
        )
