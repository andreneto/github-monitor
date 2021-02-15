import datetime
from repositories import models, github


class RemoteAPIError(Exception):
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
        commits = cls._fetch_repository_commits(
            username=username,
            repo_name=repo_name,
            since=commits_since,
            until=commits_until,
        )
        repository = models.Repository.objects.create(name=repo_name)
        commits = models.Commit.objects.bulk_create(
            [cls._prepare_commit(commit, repository) for commit in commits]
        )

        return repository

    @classmethod
    def _fetch_repository_data(cls, username, repo_name):
        try:
            repo = github.get_repo(username=username, repository=repo_name)
        except github.NotFoundError as not_found:
            raise RepositoryNotFoundError() from not_found
        except github.ForbiddenError as forbidden_error:
            raise RepositoryForbiddenError() from forbidden_error

        return repo

    @classmethod
    def _fetch_repository_commits(
        cls,
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

    @classmethod
    def _prepare_commit(cls, commit, repository):
        try:
            avatar = commit["author"]["avatar"]
        except KeyError:
            try:
                avatar = commit["commiter"]["avatar"]
            except KeyError:
                avatar = ""

            return {
                "message": commit["commit"]["message"],
                "sha": commit["sha"],
                "author": commit["commit"]["author"]["email"],
                "url": commit["commit"]["url"],
                "date": commit["author"]["date"],
                "avatar": avatar,
                "repository": repository,
            }
