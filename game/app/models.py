from django.db import models

# Create your models here.


class Players(models.Model):
    name = models.CharField(max_length=40)
    password = models.CharField(max_length=30)
    record = models.IntegerField(default=0)
    email = models.EmailField(default='')