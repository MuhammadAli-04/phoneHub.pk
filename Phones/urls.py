"""Project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views
urlpatterns = [
    path("", views.home, name='Home'),
    path("signUp", views.signUp, name='signUp'),
    path("signIn", views.signIn, name='signIn'),
    path("signOut", views.signOut, name='signOut'),
    path("compare", views.compare, name='compare'),
    path("brandPhones/<brand>/", views.brandPhones, name='brandPhones'),
    path("specs/<brand>/<name>/", views.specs, name='specs'),
    path("blogs", views.blogs, name='blogs'),
    path("addBlog", views.addBlog, name='addBlog'),
    path("addToCart/<brand>/<name>/", views.addtocart, name='addtocart'),
    path("cart", views.cart, name='cart'),
    path("deleteFromCart/<brand>/<phone>",
         views.deleteFromCart, name='deleteFromCart'),
    path("checkOut", views.checkOut, name='checkOut'),
    path("addComment/<id>", views.addComment, name='addComment'),
]
