from django.db import models

diffs = [
    ('Easy', 'Easy - (2x4)'),
    ('Medium', 'Medium - (3x4)'),
    ('Hard', 'Hard - (4x4)'),
]

class InputModel(models.Model):
    Difficulty = models.CharField(max_length=20, choices=diffs, default='easy')

    def __str__(self):
        return f"{self.Difficulty}"
 
class LeaderBoard(models.Model):
    Name = models.CharField(max_length=500)
    Difficulty = models.CharField(max_length=20, choices=diffs, default='easy')    
    flips = models.CharField(max_length=15)
    timeleft = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.Name} | {self.Difficulty} | {self.flips}| {self.timeleft}"
