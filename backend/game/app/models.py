from django.db import models

# Create your models here.


class Players(models.Model):
    name = models.CharField(max_length=40)
    record = models.IntegerField(default=0)


    def __str__(self):
        return f'id {self.id}: {self.name}'