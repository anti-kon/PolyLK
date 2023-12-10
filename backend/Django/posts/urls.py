from django.urls import path
from . import views
from .views import PostsView

urlpatterns = [
    path('post', PostsView.post),
    path('get', PostsView.get),
    path('delete', PostsView.delete),
]