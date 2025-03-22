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
from .utils import *
from pathlib import Path

# Global variables
upload_files = ["SuvarnaKhet.docx"]

knowledge_base_path = f"{Path(settings.FILE_BASE_PATH).as_posix()}/documents/"
print(knowledge_base_path)

knowledge_list = []

for upload_file in upload_files:
    knowledge_path = f"{knowledge_base_path}{upload_file}"
    knowledge = load_knowledge(knowledge_path)
    knowledge_list.append(knowledge)
    
print(knowledge_list)


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
    
    print(f"name: {name}, mobile: {mobile}, gender: {gender}, dob: {dob}")
    
    if name and mobile and gender and dob:
        response = requests.get(f"{glob_url}/api/users_farmers_get/",{"uf_mobile":mobile})
        if response.status_code == 200:
            user_data = response.json()
            print(user_data)
            
        if user_data != []:
            return JsonResponse({"success":False,"msg":"Mobile number already registered..!"})
        
        # Insert data in table by calling API
        register_payload = {
            'uf_role_id': 4,
            'uf_name': name,
            'uf_email': "N/A",
            'uf_mobile': mobile,
            'uf_gender': gender,
            'uf_dob': dob,
            'uf_address': "N/A",
            'uf_city': "N/A",
            'uf_state': "N/A",
            'uf_pincode': "000000",
            'status': 1,
            'create_datetime': datetime.now().isoformat()
        }

        # Make POST request using `json` parameter
        register_response = requests.post(
            f"{glob_url}/api/users_farmers_post/", 
            json=register_payload,
            headers={'Content-Type': 'application/json'}
        )

        # Check the response
        print(f"Status Code: {register_response.status_code}")
        print(f"Response Body: {register_response.json()}")
        
        # Send registration msg
        message_body = f"""Thank you for registration.

Welcome {name} at SuvarnaKhet.
            
Thank You
SuvarnaKhet Team"""

        try:
            account_sid = 'AC4b5cf27c79c19ccc9423ceed511e7eec'
            auth_token = 'b6e5bf9c5ecf64cdf84174b3ce314e63'
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                body = message_body,
                from_ = '+18482742758',
                to=f'+91{mobile}'
            )
            print(message.sid)
        except:
            return JsonResponse({"success":True,"msg":"You Are Registered Successfully."})
        
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
                account_sid = 'AC4b5cf27c79c19ccc9423ceed511e7eec'
                auth_token = 'b6e5bf9c5ecf64cdf84174b3ce314e63'
                client = Client(account_sid, auth_token)
                message = client.messages.create(
                    body = message_body,
                    from_ = '+18482742758',
                    to=f'+91{mobile}'
                )
                print(message.sid)
                
                return JsonResponse({"success":True,"msg":"OTP Sent Successfully."})
            except Exception as e:
                return JsonResponse({"success":False,"msg":"We not able to send OTP now, Please try again after sometime..!"})
        else:
            return JsonResponse({"success":False,"msg":"Mobile number not registered..!"})
    except Exception as e:
        return JsonResponse({"success":False,"msg":f"Error:{e}"})        

@csrf_exempt
def verify_otp(request):
    global registration_otps
    mobile = request.GET.get("mobile")
    otp = request.GET.get("otp")
    
    print(f"mobile: {mobile}, OTP: {otp}")
    print(f"Glob OTP: {registration_otps}, {registration_otps[mobile]}")
    
    response = requests.get(f"{glob_url}/api/users_farmers_get/",{"uf_mobile":mobile})
    if response.status_code == 200:
        usr_fm_data = response.json()
        
    print(usr_fm_data)
    
    if registration_otps[mobile] == int(otp):
        print("if")
        return JsonResponse({"success":True,"msg":"Login Successfully.","user":usr_fm_data[0]})
    else:
        print("else")
        return JsonResponse({"success":False,"msg":"OTP does not match..!"})

@csrf_exempt
def send_chatboat_response(request):
    user_text = request.GET.get("user_text")
    
    ai_response = get_ai_response(knowledge_list, user_text)
    
    return JsonResponse({"success":True,"ai_text":ai_response})

# @csrf_exempt
# def approve_sell_request(request):
     
     
@csrf_exempt
def add_to_cart(request):
    uf_id = request.GET.get("uf_id")
    p_id = request.GET.get("p_id")
    quantity = request.GET.get("quantity")
    
    response = requests.get(f"{glob_url}/api/cart_get/",{"uf_id":uf_id,"p_id":p_id,"status":1})
    if response.status_code == 200:
        cart_data = response.json()
    print(cart_data)
    
    if cart_data == []:
        cart_payload = {
            'uf_id': uf_id,
            'p_id': p_id,
            'qty': 1,
            'status': 1,
            'create_datetime': datetime.now().isoformat()
        }

        # Make POST request using `json` parameter
        register_response = requests.post(
            f"{glob_url}/api/cart_post/", 
            json=cart_payload,
            headers={'Content-Type': 'application/json'}
        )
        
        if register_response.status_code == 201:
            return JsonResponse({"success":True,"msg":"Add to cart successfully!"})
        else:
            return JsonResponse({"success":False,"msg":"Not able to add into cart! Try again later!"})
    else:
        qty = int(cart_data[0].qty) + int(quantity)
        
        response = requests.get(f"{glob_url}/api/cart_update/?uf_id={uf_id}&p_id={p_id}&status=1",{"qty":qty})
        print(f"Update:{response}")
        
        return JsonResponse({"success":True,"msg":"Add to cart successfully!"})