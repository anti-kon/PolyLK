from django.apps import AppConfig
from py_eureka_client import eureka_client


class RegistrationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def on_err(err_type: str, err: Exception):
        if err_type in (eureka_client.ERROR_REGISTER, eureka_client.ERROR_DISCOVER):
            eureka_client.stop()
        else:
            print(f"{err_type}::{err}")

    def ready(self):
        # The flowing code will register your server to eureka server and also start to send heartbeat every 30 seconds
        eureka_client.init(eureka_server="http://localhost:8761/eureka",
                           app_name="django-registration",
                           instance_host="localhost",
                           instance_port=8001,
                           on_error=self.on_err)
