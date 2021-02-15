import requests

BASE_URL = "https://api.github.com"
HEADERS = {"accept": "application/vnd.github.v3+json"}


class GitHubAPIError(Exception):
    pass


class NotFoundError(GitHubAPIError):
    pass


class ForbiddenError(GitHubAPIError):
    pass


class InternalServerError(GitHubAPIError):
    pass


class ValidationError(GitHubAPIError):
    pass


class BadRequestError(GitHubAPIError):
    pass


class ConflictError(GitHubAPIError):
    pass


def list_repos(username):
    url = "{base}/users/{username}/repos".format(base=BASE_URL, username=username)
    response = requests.get(url, headers=HEADERS)
    return response.json()


def get_repo(username, repository):
    url = "{base}/repos/{username}/{repository}".format(
        base=BASE_URL, username=username, repository=repository
    )
    response = requests.get(url, headers=HEADERS)
    contents = response.json()

    if response.status_code == 404:
        raise NotFoundError(contents.get("message", ""))

    if response.status_code == 403:
        raise ForbiddenError(contents.get("message", ""))

    return contents


def list_commits(username, repository, since=None, until=None):
    url = "{base}/repos/{owner}/{repo}/commits".format(
        base=BASE_URL, owner=username, repo=repository
    )

    params = {"since": since, "until": until}
    response = requests.get(url, headers=HEADERS, params=params)
    contents = response.json()

    if response.status_code == 400:
        raise BadRequestError(contents.get("message", ""))

    if response.status_code == 404:
        raise NotFoundError(contents.get("message", ""))

    if response.status_code == 409:
        raise ConflictError(contents.get("message", ""))

    if response.status_code == 500:
        raise InternalServerError(contents.get("message", ""))

    return contents


def get_commit(username, repository, ref):
    url = "{base}/repos/{owner}/{repo}/commits/{ref}".format(
        base=BASE_URL, owner=username, repo=repository, ref=ref
    )
    response = requests.get(url)
    contents = response.json()

    if response.status_code == 404:
        raise NotFoundError(contents.get("message", ""))

    if response.status_code == 422:
        raise ValidationError(contents.get("message", ""))

    if response.status_code == 500:
        raise InternalServerError(contents.get("message", ""))

    return contents


def list_hooks(username, repository, access_token):
    url = "{base}/repos/{owner}/{repo}/hooks".format(
        base=BASE_URL, owner=username, repo=repository
    )

    token = "token {access_token}".format(access_token=access_token)
    response = requests.get(url, headers={**HEADERS, "authorization": token})
    return response.json()


def create_hook(username, repository, delivery_url, access_token, verify_ssl=True):
    url = "{base}/repos/{owner}/{repo}/hooks".format(
        base=BASE_URL, owner=username, repo=repository
    )

    payload = {
        "config": {
            "url": delivery_url,
            "content_type": "json",
            "insecure_ssl": (0 if verify_ssl else 1),
        }
    }

    token = "token {access_token}".format(access_token=access_token)
    response = requests.post(
        url, headers={**HEADERS, "authorization": token}, json=payload
    )
    return response.json()
