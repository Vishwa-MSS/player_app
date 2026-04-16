from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    jerseyNo = models.IntegerField()
    age = models.IntegerField()
    height = models.IntegerField()
    weight = models.IntegerField()
    nationality = models.CharField(max_length=100)
    skillSet = models.CharField(max_length=50)
    bowlingType = models.CharField(max_length=50, blank=True, null=True)
    battingStyle = models.CharField(max_length=50)
    runsScored = models.IntegerField()
    average = models.FloatField()
    strikeRate = models.FloatField()
    wickets = models.IntegerField(blank=True, null=True)
    economy = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name
