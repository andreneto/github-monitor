from githubmonitor.celery import app
from .models import Commit, Repository
from .github import list_commits


@app.task()
def fetch_commits(username, repo_name, repository_id, since, until):

    commits = list_commits(
        username=username,
        repository=repo_name,
        since=since,
        until=until,
    )

    repository = Repository.objects.get(pk=repository_id)
    commits = Commit.objects.bulk_create(
        [Commit.prepare(commit=commit, repository=repository) for commit in commits]
    )