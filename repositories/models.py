from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class GitHubProfile(models.Model):
    github_id = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=100, blank=True)
    username = models.CharField(max_length=100, unique=True)
    avatar = models.URLField(max_length=200, blank=True)
    url = models.URLField(max_length=200)

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)

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

    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ("-authored_at",)
