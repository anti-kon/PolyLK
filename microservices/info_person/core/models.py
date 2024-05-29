from django.db import models
from django.contrib.postgres.fields import ArrayField


class PersonsDocs(models.Model):
    id_doc = models.AutoField(primary_key=True)
    id_person = models.IntegerField(blank=True, null=True)
    name_doc = models.CharField(max_length=50, blank=True, null=True)
    path_to_doc = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persons_docs'


class DormDocs(models.Model):
    id_dd = models.AutoField(primary_key=True)
    id_person_dd = models.IntegerField(blank=True, null=True)
    name_dd = models.CharField(max_length=50, blank=True, null=True)
    path_to_doc_dd = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dorm_docs'


class Persons(models.Model):
    id_person = models.AutoField(primary_key=True)
    login_person = models.CharField(max_length=50, blank=True, null=True)
    password_person = models.CharField(max_length=50, blank=True, null=True)
    dorm_num_person = models.IntegerField(blank=True, null=True)
    remember_me_person = ArrayField(models.TextField(blank=True, null=True))

    class Meta:
        managed = False
        db_table = 'persons'
