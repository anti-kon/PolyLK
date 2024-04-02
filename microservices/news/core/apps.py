from django.apps import AppConfig
from py_eureka_client import eureka_client


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        # The flowing code will register your server to eureka server and also start to send heartbeat every 30 seconds
        eureka_client.init(eureka_server="http://localhost:8761/eureka",
                           app_name="django-news",
                           instance_host="localhost",
                           instance_port=8004)
