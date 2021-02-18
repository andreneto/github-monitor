from rest_framework import routers

from .views import RepositoryViewSet, CommitViewSet

router = routers.SimpleRouter()
router.register(r"repositories", RepositoryViewSet, basename="repositories")
router.register(r"commits", CommitViewSet, basename="commits")

app_name = "repositories"

urlpatterns = router.urls
