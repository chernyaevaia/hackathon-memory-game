from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User

from memory.models import LeaderBoard
from memory.serializers import LeaderBoardSerializer, UserAllSerializer


class LeaderBoardModelViewSet(ModelViewSet):
    queryset = LeaderBoard.objects.all()
    serializer_class = LeaderBoardSerializer

class AllUserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserAllSerializer
