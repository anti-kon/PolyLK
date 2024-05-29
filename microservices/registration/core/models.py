# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.postgres.fields import ArrayField


class Persons(models.Model):
    id_person = models.AutoField(primary_key=True)
    login_person = models.CharField(max_length=50, blank=True, null=True)
    password_person = models.CharField(max_length=50, blank=True, null=True)
    dorm_num_person = models.IntegerField(blank=True, null=True)
    remember_me_person = ArrayField(models.TextField(blank=True, null=True))

    class Meta:
        managed = False
        db_table = 'persons'
