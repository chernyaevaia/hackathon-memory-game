from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User

from memory.models import LeaderBoard
from memory.serializers import LeaderBoardSerializer, UserAllSerializer


class LeaderBoardListAPIView(ListAPIView):
    queryset = LeaderBoard.objects.all()
    serializer_class = LeaderBoardSerializer

class AllUserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserAllSerializer
