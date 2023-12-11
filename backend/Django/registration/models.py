# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Ads(models.Model):
    id_ads = models.AutoField(primary_key=True)
    dorm_num_ads = models.IntegerField(blank=True, null=True)
    info_ads = models.CharField(max_length=1000, blank=True, null=True)
    price_ads = models.IntegerField(blank=True, null=True)
    alternative_payment_ads = models.CharField(max_length=100, blank=True, null=True)
    list_photo_ads = models.TextField(blank=True, null=True)  # This field type is a guess.
    id_person_ads = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ads'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class DormDocs(models.Model):
    id_dd = models.AutoField(primary_key=True)
    id_person_dd = models.IntegerField(blank=True, null=True)
    name_dd = models.CharField(max_length=50, blank=True, null=True)
    path_to_doc_dd = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dorm_docs'


class Machines(models.Model):
    id_machine = models.AutoField(primary_key=True)
    num_machine = models.IntegerField(blank=True, null=True)
    dorm_num_machine = models.IntegerField(blank=True, null=True)
    type_machine = models.CharField(max_length=10, blank=True, null=True)
    is_broken = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'machines'


class News(models.Model):
    id_new = models.AutoField(primary_key=True)
    text_new = models.CharField(max_length=10000, blank=True, null=True)
    list_photo_new = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'news'


class Persons(models.Model):
    id_person = models.AutoField(primary_key=True)
    login_person = models.CharField(max_length=50, blank=True, null=True)
    password_person = models.CharField(max_length=50, blank=True, null=True)
    dorm_num_person = models.IntegerField(blank=True, null=True)
    remember_me_person = models.CharField(max_length=32, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persons'


class PersonsDocs(models.Model):
    id_doc = models.AutoField(primary_key=True)
    id_person_doc = models.IntegerField(blank=True, null=True)
    name_doc = models.CharField(max_length=50, blank=True, null=True)
    path_to_doc = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persons_docs'


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
    id_person_service = models.IntegerField(blank=True, null=True)
    message_service = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'services'
