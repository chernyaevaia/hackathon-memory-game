from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.home, name="home"),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    path("login/", views.loginView, name='loginView'),
    path("game/", views.game, name="game"),
    path("leaderboard/", views.leaderboard, name="leaderboard"),
    path('upload/', views.upload, name="upload"),
    path('signup/', views.signup, name="signup"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)