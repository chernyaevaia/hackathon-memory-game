from django.contrib import admin
from django.contrib.admin import ModelAdmin

from app.models import Players


# Register your models here.


@admin.register(Players)
class PlayersAdmin(ModelAdmin):
    pass