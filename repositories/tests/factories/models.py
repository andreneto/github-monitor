import factory
from factory.django import DjangoModelFactory


class GitHubProfileFactory(DjangoModelFactory):
    class Meta:
        model = "repositories.GitHubProfile"

    github_id = factory.sequence(lambda n: n)
    name = factory.Faker("name")
    username = factory.Faker("user_name")
    avatar = factory.Faker("image_url")
    url = factory.lazy_attribute(
        lambda o: "https://github.com/{username}".format(username=o.username)
    )


class RepositoryFactory(DjangoModelFactory):
    class Meta:
        model = "repositories.Repository"

    github_id = factory.sequence(lambda n: n)
    name = factory.Faker("slug")
    owner = factory.SubFactory(GitHubProfileFactory)


class CommitFactory(DjangoModelFactory):
    class Meta:
        model = "repositories.Commit"

    message = factory.Faker("sentence")
    sha = factory.Faker("sha1")
    url = factory.Faker("url")
    author_name = factory.Faker("name")
    author_email = factory.Faker("email")
    authored_at = factory.Faker("date_time_this_month")
    author_profile = factory.SubFactory(GitHubProfileFactory)

    committer_name = factory.Faker("name")
    committer_email = factory.Faker("email")
    committed_at = factory.Faker("date_time_this_month")
    committer_profile = factory.SubFactory(GitHubProfileFactory)

    repository = factory.SubFactory(RepositoryFactory)
