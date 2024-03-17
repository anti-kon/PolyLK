"""
File in which we have the middleware for Django for Authenticating API requests
"""
import json
import jwt
import logging
from environs import Env
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response

# # Initialize logger
# logger = logging.getLogger(__name__)

# Get JWT secret key
env = Env()
env.read_env()
# SECRET_KEY = env("PolyLK")
SECRET_KEY = "PolyLK"


# def create_response(request_id, code, message):
#
#     """
#     Function to create a response to be sent back via the API
#     :param request_id:Id fo the request
#     :param code:Error Code to be used
#     :param message:Message to be sent via the APi
#     :return:Dict with the above given params
#     """
#
#     try:
#         req = str(request_id)
#         data = {"data": message, "code": int(code), "request_id": req}
#         return data
#     except Exception as creation_error:
#         logger.error(f'create_response:{creation_error}')


class CustomMiddleware(MiddlewareMixin):

    """
    Custom Middleware Class to process a request before it reached the endpoint
    """

    def process_request(self, request):

        """
        Custom middleware handler to check authentication for a user with JWT authentication
        :param request: Request header containing authorization tokens
        :type request: Django Request Object
        :return: HTTP Response if authorization fails, else None
        """

        jwt_token = request.headers.get('authorization', None)
        print(1)
        print(jwt_token)
        # return None
        #logger.info(f"request received for endpoint {str(request.path)}")

        #If token Exists
        if jwt_token:
            try:
                print(2)
                payload = jwt.decode(jwt_token.split(' ')[1], SECRET_KEY, algorithms=['HS256'])
                id_person = payload['id_person']
                login_person = payload['login_person']
                print(payload)
                #logger.info(f"Request received from user - {userid}, company - {company_id}")
                return None
            except jwt.ExpiredSignatureError:
                print(3)
                return Response('Истек срок токена', status=401)# посмотреть код ошибки
            except (jwt.DecodeError, jwt.InvalidTokenError):
                print(4)
                return Response('Неверный токен', status=401)
        else:
            # response = create_response(
            #     "", 401, {"message": "Authorization not found, Please send valid token in headers"}
            # )
            # #logger.info(f"Response {response}")
            # return HttpResponse(json.dumps(response), status=401)
            print(5)
            return Response('Пользователь не авторизован', status=401)

