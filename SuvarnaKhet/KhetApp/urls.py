from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('registration_py', registration, name="registration_py"),
    path('send_otp_py', send_otp, name="send_otp_py"),
    path('verify_otp_py', verify_otp, name="verify_otp_py"),
    path('send_ai_res', send_chatboat_response, name="send_ai_res"),
    path('add_cart_py', add_to_cart, name="add_cart_py"),
]