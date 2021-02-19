from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class GitHubProfile(models.Model):
    github_id = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=100, blank=True)
    username = models.CharField(max_length=100, unique=True)
    avatar = models.URLField(max_length=200, blank=True)
    url = models.URLField(max_length=200)

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="github_profile",
    )

    def __str__(self):
        return self.username


class Repository(models.Model):
    owner = models.ForeignKey(
        "repositories.GitHubProfile",
        on_delete=models.CASCADE,
        related_name="repositories",
    )
    name = models.CharField(max_length=100)
    github_id = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Repositories"


class Commit(models.Model):
    message = models.TextField()
    sha = models.CharField(max_length=100)
    url = models.URLField(max_length=200)

    author_name = models.CharField(max_length=50)
    author_email = models.EmailField()
    authored_at = models.DateTimeField()
    author_profile = models.ForeignKey(
        "repositories.GitHubProfile",
        on_delete=models.CASCADE,
        related_name="authored_commits",
        null=True,
        blank=True,
    )

    committer_name = models.CharField(max_length=50)
    committer_email = models.EmailField()
    committed_at = models.DateTimeField()
    committer_profile = models.ForeignKey(
        "repositories.GitHubProfile",
        on_delete=models.CASCADE,
        related_name="committed_commits",
        null=True,
        blank=True,
    )

    repository = models.ForeignKey(
        Repository, on_delete=models.CASCADE, related_name="commits"
    )

    def __str__(self):
        return self.message

    class Meta:
        ordering = ("-authored_at",)

    @staticmethod
    def prepare(commit, repository):
        try:
            author_profile, created = GitHubProfile.objects.get_or_create(
                github_id=commit["author"]["id"],
                defaults={
                    "name": commit["author"]["login"],
                    "username": commit["author"]["login"],
                    "avatar": commit.get("author", {}).get("avatar_url", ""),
                    "url": commit["author"]["html_url"],
                },
            )
        except (KeyError, TypeError) as err:
            author_profile = None

        try:
            committer_profile, created = GitHubProfile.objects.get_or_create(
                github_id=commit["committer"]["id"],
                defaults={
                    "name": commit["committer"]["login"],
                    "username": commit["committer"]["login"],
                    "avatar": commit.get("committer", {}).get("avatar_url", ""),
                    "url": commit["committer"]["html_url"],
                },
            )
        except (KeyError, TypeError) as err:
            committer_profile = None

        return Commit(
            **{
                "message": commit["commit"]["message"],
                "sha": commit["sha"],
                "url": commit["commit"]["url"],
                "author_name": commit["commit"]["author"]["name"],
                "author_email": commit["commit"]["author"]["email"],
                "authored_at": commit["commit"]["author"]["date"],
                "author_profile": author_profile,
                "committer_name": commit["commit"]["committer"]["name"],
                "committer_email": commit["commit"]["committer"]["email"],
                "committed_at": commit["commit"]["committer"]["date"],
                "committer_profile": committer_profile,
                "repository": repository,
            }
        )
