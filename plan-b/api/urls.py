from django.urls import path

from api.views import LeaderBoardListAPIView, AllUserListAPIView

app_name = 'api'

urlpatterns = [
	path('leaders/', LeaderBoardListAPIView.as_view(), name='leaders'),
	path('users/', AllUserListAPIView.as_view(), name='users'),
]
