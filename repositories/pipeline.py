from .models import GitHubProfile


def create_github_profile(backend, response, user=None, *args, **kwargs):
    if backend.name == "github":
        if user:
            GitHubProfile.objects.update_or_create(
                github_id=response["id"],
                defaults={
                    "name": response.get("name", response["username"]),
                    "username": response["login"],
                    "avatar": response.get("avatar_url", ""),
                    "url": response["html_url"],
                    "user": user,
                },
            )
