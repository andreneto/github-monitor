from django.contrib.auth.views import LogoutView
from django.urls import path, re_path

from .views import HomeView, LoginView

app_name = "common"

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("logout", LogoutView.as_view(), name="logout"),
    path("", HomeView.as_view(), name="home"),
    re_path(r"^(?P<path>.*)/$", HomeView.as_view(), name="home_fallback"),
]
