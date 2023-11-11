from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from app.models import Players
from app.serializers import PlayersSerializer


class PlayersView(APIView):
    def get(self, request):
        output = [{'name': output.name,
                   'password': output.password,
                   'record': output.record,
                   'email': output.email}
                  for output in Players.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = PlayersSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)