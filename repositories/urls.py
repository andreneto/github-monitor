from rest_framework import routers

from .views import RepositoryViewSet

router = routers.SimpleRouter()
router.register(r"repositories", RepositoryViewSet, basename="repositories")

app_name = "repositories"

urlpatterns = router.urls
