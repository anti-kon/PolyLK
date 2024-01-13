# import py_eureka_client.eureka_client as eureka_client
#
#
# def on_err(err_type: str, err: Exception):
#     if err_type in (eureka_client.ERROR_REGISTER, eureka_client.ERROR_DISCOVER):
#         eureka_client.stop()
#     else:
#         print(f"{err_type}::{err}")
#
#
# eureka_client.init(eureka_server="http://localhost:8081/eureka/",
#                    app_name="registration",
#                    instance_port=8000,
#                    instance_unsecure_port_enabled=True,
#                    instance_secure_port_enabled=False,
#                    instance_secure_port=443,
#                    instance_host="127.0.0.1",
#                    on_error=on_err)
#
