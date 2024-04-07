from django.urls import path
from core.views import *

urlpatterns = [
    path('posts/', PostsView.as_view(), name='posts')
]
