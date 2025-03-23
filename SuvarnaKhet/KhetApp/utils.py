import os
# import fitz
import spacy 
import psutil
import pyttsx3
import docx2txt
import platform
import subprocess
# import speech_recognition as sr
import google.generativeai as genai
from datetime import datetime
from user_agents import parse
from django.http import JsonResponse

from gtts import gTTS
from pydub import AudioSegment
from pydub.utils import mediainfo
import os
from tempfile import NamedTemporaryFile
from django.conf import settings

from transformers import pipeline
model = pipeline("zero-shot-classification")
from twilio.rest import Client

nlp = spacy.load("en_core_web_sm")
api_key = "AIzaSyBdJZpZvDKMsP1saOaEdk7lHt_DpbNr_7E"
genai.configure(api_key=api_key)

engine = pyttsx3.init()
# recognizer = sr.Recognizer()

# from openai import OpenAI
# openai = OpenAI(api_key= "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")


# def load_pdf(file_path):
#     try:
#         doc = fitz.open(file_path)
#         text = ""
#         for page_num in range(doc.page_count):
#             page = doc.load_page(page_num)
#             text += page.get_text("text")
#         return text  
#     except Exception as e:
#         return f"Error reading PDF {file_path}: {e}"

def load_docx(file_path):
    try:
        text = docx2txt.process(file_path)
        return text  
    except Exception as e:
        return f"Error reading DOCX {file_path}: {e}"

def load_txt(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
        return text  
    except Exception as e:
        return f"Error reading TXT file {file_path}: {e}"

def load_knowledge(file_paths):
    knowledge = ""
    ext = os.path.splitext(file_paths)[1].lower()
    try:
        # if ext == '.pdf':
        #     knowledge += load_pdf(file_paths)
        if ext == '.docx':
            knowledge += load_docx(file_paths)
        elif ext == '.txt':
            knowledge += load_txt(file_paths)
    except Exception as e:
        return f"Error loading one or more files: {str(e)}"

    return knowledge

def nlp_process_input(user_input):
    doc = nlp(user_input)

    entities = [(ent.text, ent.label_) for ent in doc.ents]
    keywords = [token.text for token in doc if token.is_stop == False and token.is_punct == False]
     
    return {'entities': entities, 'keywords': keywords}

def get_ai_response(knowledge, user_input):
    if not knowledge:
        return JsonResponse({"status": "error", "message": "Sorry, I couldn't retrieve any knowledge to answer your question."}, status=400)

    # nlp_data = nlp_process_input(user_input)
    print(f"Knowledge: {knowledge}")
    prompt = f"Based on the following knowledge:\n{knowledge}\n. If a short explanation is necessary, use only one or two lines with no extra details: {user_input} language of question is keep in answer."
    
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        
        return response.text
    except Exception as e:
        return "Sorry, I couldn't generate a response."
    
