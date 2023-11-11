from django.contrib import admin

from .models import InputModel, LeaderBoard

# Register your models here.
admin.site.register(InputModel)
admin.site.register(LeaderBoard)