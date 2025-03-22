from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import random
from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMessage
import os
from django.shortcuts import render
from cryptography.fernet import Fernet
import qrcode
from datetime import datetime
from dotenv import load_dotenv
import pandas as pd
from django.db import connection
from twilio.rest import Client
import requests
import json

# Create your views here.
glob_url = "http://127.0.0.1:8000"
registration_otps = {}

@csrf_exempt
def index(request):
    return HttpResponse("Index")
    # return render(request,"index.html")
    
@csrf_exempt
def registration(request):
    name = request.GET.get("name")
    mobile = request.GET.get("mobile")
    gender = request.GET.get("gender")
    dob = request.GET.get("dob")
    
    if name and mobile and gender and dob:
        # Insert data in table by calling API
        register_payload = {
            'uf_name' : name,
            'uf_email' : "",
            'uf_mobile' : mobile,
            'uf_gender' : gender,
            'uf_dob' : dob,
            'uf_address' : "",
            'uf_city' : "",
            'uf_state' : "",
            'uf_pincode' : "",
            'status' : "",
            'create_datetime' : datetime.now().isoformat()
        }
        register_response = requests.post(f"{glob_url}/api/users_farmers_post/", data=json.dumps(register_payload), headers={'Content-Type': 'application/json'})        
        print(register_response.json())
        
        # Send registration msg
        message_body = f"""Thank you for registration.

Welcome {name} at SuvarnaKhet.
            
Thank You
SuvarnaKhet Team"""

        from twilio.rest import Client
        account_sid = 'AC4b5cf27c79c19ccc9423ceed511e7eec'
        auth_token = 'cceaa46548dee51abd88c931f222338d'
        client = Client(account_sid, auth_token)
        message = client.messages.create(
            body = message_body,
            to=f'+91{mobile}'
        )
        print(message.sid)
        
        return JsonResponse({"success":True,"msg":"You Are Registered Successfully."})
    else:
        return JsonResponse({"success":False,"msg":"All fields required..!"})
    
@csrf_exempt
def send_otp(request):
    global registration_otps
    mobile = request.GET.get("mobile")
    
    if not mobile:
        return JsonResponse({"success":False,"msg":"Required all fields..!"})
    
    try:
        response = requests.get(f"{glob_url}/api/users_farmers_get/",{"uf_mobile":mobile})
        if response.status_code == 200:
            usr_fm_data = response.json()
        print(usr_fm_data)
        
        if usr_fm_data != []:
            otp = random.randint(100000, 999999)
            print(otp)
            registration_otps[mobile] = otp
            
            message_body = f"""Hello,
{otp} is your mobile number verification code.
                
Thank You
SuvarnaKhet Team"""
            try:
                from twilio.rest import Client
                account_sid = 'AC4b5cf27c79c19ccc9423ceed511e7eec'
                auth_token = 'cceaa46548dee51abd88c931f222338d'
                client = Client(account_sid, auth_token)
                message = client.messages.create(
                    body = message_body,
                    to=f'+91{mobile}'
                )
                print(message.sid)
            except Exception as e:
                return JsonResponse({"success":False,"msg":"We not able to send OTP now, Please try again after sometime..!"})
        else:
            return JsonResponse({"success":False,"msg":"Mobile number not registered..!"})
    except Exception as e:
        return JsonResponse({"success":False,"msg":f"Error:{e}"})        

@csrf_exempt
def verify_otp(request):
    global registration_otps
    # data = json.loads(request.body)
    mobile = request.GET.get("mobile")
    otp = request.GET.get("otp")
    
    print(f"mobile: {mobile}, OTP: {otp}")
    print(f"Glob OTP: {registration_otps}, {registration_otps[mobile]}")
    
    if registration_otps[mobile] == int(otp):
        return JsonResponse({"success":True,"msg":"Login Successfully."})
    else:
        return JsonResponse({"success":False,"msg":"OTP does not match..!"})

