from rest_framework  import serializers
from app.models import Players


class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = ['name', 'record']