from django.contrib import admin

from .models import GitHubProfile, Repository, Commit


class GitHubProfileAdmin(admin.ModelAdmin):
    list_filter = ("user",)
    list_display = ("username", "name", "github_id")


class RepositoryAdmin(admin.ModelAdmin):
    list_filter = ("owner",)
    list_display = ("owner", "name", "github_id")


class CommitAdmin(admin.ModelAdmin):
    list_filter = ("repository",)
    list_display = ("message", "authored_at")


admin.site.register(GitHubProfile, GitHubProfileAdmin)
admin.site.register(Repository, RepositoryAdmin)
admin.site.register(Commit, CommitAdmin)
