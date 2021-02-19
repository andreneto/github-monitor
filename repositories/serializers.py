from django.db.models import fields
from rest_framework import serializers
from .models import Commit, Repository, GitHubProfile
from .services import RepositoryService


class GitHubProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GitHubProfile
        fields = ("name", "username", "avatar", "url")
        read_only_fields = ("name", "username", "avatar", "url")


class RepositorySerializer(serializers.ModelSerializer):
    full_name = serializers.RegexField(
        r"^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\/[A-Za-z0-9_.-]+$", write_only=True
    )
    owner = GitHubProfileSerializer(many=False, read_only=True)

    class Meta:
        model = Repository
        fields = ("id", "owner", "name", "description", "full_name")
        read_only_fields = ("id", "owner", "name", "description")

    def create(self, validated_data):
        owner, name = validated_data["full_name"].split("/", 1)
        instance = RepositoryService.add_repository(owner, name)
        return instance


class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.StringRelatedField(many=False)
    author_profile = GitHubProfileSerializer(many=False, read_only=True)

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

        read_only_fields = (
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
