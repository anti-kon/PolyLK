# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Machines(models.Model):
    id_machine = models.AutoField(primary_key=True)
    num_machine = models.IntegerField(blank=True, null=True)
    dorm_num_machine = models.IntegerField(blank=True, null=True)
    type_machine = models.CharField(max_length=10, blank=True, null=True)
    is_broken = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'machines'


class RecordsMachines(models.Model):
    id_record_machine = models.AutoField(primary_key=True)
    id_person_rm = models.IntegerField(blank=True, null=True)
    dorm_num_rm = models.IntegerField(blank=True, null=True)
    id_machine_rm = models.IntegerField(blank=True, null=True)
    start_time_rm = models.DateTimeField(blank=True, null=True)
    end_time_rm = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'records_machines'


class Services(models.Model):
    id_service = models.AutoField(primary_key=True)
    service = models.CharField(max_length=100, blank=True, null=True)
    date_time_service = models.DateField(blank=True, null=True)
    id_person = models.IntegerField(blank=True, null=True)
    message_service = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'services'
