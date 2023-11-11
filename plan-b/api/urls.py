from django.urls import path, include

from rest_framework import routers

from api.views import LeaderBoardModelViewSet, AllUserModelViewSet

app_name = 'api'

routerLead = routers.DefaultRouter()
routerLead.register(r'leaders', LeaderBoardModelViewSet)
routerUser = routers.DefaultRouter()
routerUser.register(r'users', AllUserModelViewSet)

urlpatterns = [
	path('', include(routerLead.urls)),
	path('', include(routerUser.urls)),
]
