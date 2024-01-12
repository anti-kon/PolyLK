from django.db import models
from django.contrib.postgres.fields import ArrayField
from rest_framework import serializers


class News(models.Model):
    id_new = models.AutoField(primary_key=True)
    text_new = models.CharField(max_length=10000, blank=True, null=True)
    list_photo_new = ArrayField(models.TextField(blank=True, null=True))  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'news'
