import datetime
from repositories import models, github
from .tasks import fetch_commits


class RemoteAPIError(Exception):
    pass


class MalformedResponseError(RemoteAPIError):
    pass


class RepositoryNotFoundError(RemoteAPIError):
    pass


class RepositoryForbiddenError(RemoteAPIError):
    pass


class RepositoryService:
    @classmethod
    def add_repository(
        cls, username: str, repo_name: str, commits_since=None, commits_until=None
    ):
        repo_data = cls._fetch_repository_data(username=username, repo_name=repo_name)

        try:
            owner_profile, created = models.GitHubProfile.objects.get_or_create(
                github_id=repo_data["owner"]["id"],
                defaults={
                    "name": repo_data["owner"]["login"],
                    "username": repo_data["owner"]["login"],
                    "avatar": repo_data.get("owner", {}).get("avatar_url", ""),
                    "url": repo_data["owner"]["html_url"],
                },
            )

            repository, repo_created = models.Repository.objects.get_or_create(
                github_id=repo_data["id"],
                defaults={
                    "owner": owner_profile,
                    "name": repo_data["name"],
                    "description": repo_data.get("description") or "",
                },
            )
        except KeyError as err:
            raise MalformedResponseError from err

        if repo_created:
            fetch_commits.delay(
                username=username,
                repo_name=repo_name,
                repository_id=repository.id,
                since=commits_since,
                until=commits_until,
            )

        return repository

    @classmethod
    def remove_repository(cls, instance: models.Repository):
        return instance.delete()

    @staticmethod
    def _fetch_repository_data(username: str, repo_name: str):
        try:
            repo = github.get_repo(username=username, repository=repo_name)
        except github.NotFoundError as not_found:
            raise RepositoryNotFoundError() from not_found
        except github.ForbiddenError as forbidden_error:
            raise RepositoryForbiddenError() from forbidden_error

        return repo

    @staticmethod
    def _fetch_repository_commits(
        username: str,
        repo_name: str,
        since=None,
        until=None,
        datetime_module=datetime,
    ):
        try:

            a_month_ago = datetime_module.datetime.now() - datetime_module.timedelta(30)
            today = datetime_module.datetime.now()

            since = since or a_month_ago
            until = until or today

            commits = github.list_commits(
                username=username,
                repository=repo_name,
                since=since.isoformat(),
                until=until.isoformat(),
            )
        except github.BadRequestError as bad_request:
            raise RepositoryNotFoundError() from bad_request
        except github.NotFoundError as not_found:
            raise RepositoryForbiddenError() from not_found
        except github.GitHubAPIError as github_error:
            raise RemoteAPIError() from github_error

        return commits

    @staticmethod
    def _prepare_commit(commit, repository):
        try:
            author_profile, created = models.GitHubProfile.objects.get_or_create(
                github_id=commit["author"]["id"],
                defaults={
                    "name": commit["author"]["login"],
                    "username": commit["author"]["login"],
                    "avatar": commit.get("author", {}).get("avatar_url", ""),
                    "url": commit["author"]["html_url"],
                },
            )
        except KeyError as err:
            if err.args[0] != "author":
                # raise MalformedResponseError from err
                pass
            author_profile = None
        except TypeError as err:
            author_profile = None

        try:
            committer_profile, created = models.GitHubProfile.objects.get_or_create(
                github_id=commit["committer"]["id"],
                defaults={
                    "name": commit["committer"]["login"],
                    "username": commit["committer"]["login"],
                    "avatar": commit.get("committer", {}).get("avatar_url", ""),
                    "url": commit["committer"]["html_url"],
                },
            )
        except KeyError as err:
            if err.args[0] != "committer":
                # raise MalformedResponseError from err
                pass
            committer_profile = None
        except TypeError as err:
            author_profile = None

        return {
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
