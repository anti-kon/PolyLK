# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.postgres.fields import ArrayField


class Ads(models.Model):
    id_ads = models.AutoField(primary_key=True)
    dorm_num_ads = models.IntegerField(blank=True, null=True)
    info_ads = models.CharField(max_length=1000, blank=True, null=True)
    price_ads = models.IntegerField(blank=True, null=True)
    alternative_payment_ads = models.CharField(max_length=100, blank=True, null=True)
    list_photo_ads = ArrayField(models.TextField(blank=True, null=True))  # This field type is a guess.
    id_person = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ads'
