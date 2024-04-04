import os
from django.apps import AppConfig
import py_eureka_client.eureka_client as eureka_client


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def on_err(err_type: str, err: Exception):
        if err_type in (eureka_client.ERROR_REGISTER, eureka_client.ERROR_DISCOVER):
            eureka_client.stop()
        else:
            print(f"{err_type}::{err}")

    def ready(self):
        eureka_client.init(eureka_server=f"http://"
                                         f"{os.environ.get('POLYLK_EUREKA_SERVER_HOSTNAME')}:"
                                         f"{os.environ.get('POLYLK_EUREKA_SERVER_PORT')}"
                                         f"/eureka/",
                           app_name=os.environ.get('POLYLK_POSTS_NAME'),
                           instance_port=int(os.environ.get('POLYLK_POSTS_PORT')),
                           instance_host=os.environ.get('POLYLK_POSTS_HOSTNAME'),
                           on_error=self.on_err)
