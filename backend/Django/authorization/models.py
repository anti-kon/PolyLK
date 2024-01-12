from django.db import models

class Persons(models.Model):
    id_person = models.AutoField(primary_key=True)
    login_person = models.CharField(max_length=50, blank=True, null=True)
    password_person = models.CharField(max_length=50, blank=True, null=True)
    dorm_num_person = models.IntegerField(blank=True, null=True)
    remember_me_person = models.CharField(max_length=32, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persons'

