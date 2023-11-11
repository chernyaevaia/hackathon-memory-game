from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from app.models import Players
from app.serializers import PlayersSerializer


class PlayersView(ModelViewSet):

    queryset = Players.objects.all()
    serializer_class = PlayersSerializer
