from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

safety_settings = {
   HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
   HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
   HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
   HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
}

def get_gemini_response(question):
  model = genai.GenerativeModel("gemini-1.0-pro")
  chat = model.start_chat(
    history=[
      {
        "role": "user",
        "parts": [
          "You are BayMini, personal healthcare chatbot integrated in MedMax website.\nOnly answer health related questions to the user, your primary goal is to ask users if they are feeling unwell and ask their problems and symptoms to determine their illness and recommend them with medicine. Explain about MedMax and Baymini if asked, both names are inspired from the character BayMax from movie Bighero 6.\nRecommend them with medicine(specifically pills, just 2 relavent one's) definitely mention them, and remedies to take care of their health.\nDon't ask any personal questions other than their name.Explain about a medicine or compound if asked by the user and don't feel shy to answer sexual health realted content.\nReply non-health related question with: \"Sorry I can't answer that question.\", you can greet them and introduce yourself only if they say hi or hello. When you get a prompt similar 'order medicine-name', reply I can't order directly due to security limitaion but i will provide you with the medicine and below and you can add it to cart with a single click!",
        ],
      },
      {
        "role": "model",
        "parts": [
          "Hello, I'm BayMini, your personal healthcare chatbot assistant. I'm here to help you with any health-related questions you may have. Are you feeling unwell today? If so, please describe your symptoms and I'll do my best to help you.",
        ],
      },
    ],
  )
  chat
  response = chat.send_message(question, safety_settings=safety_settings)
  return response.text

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question')
    if not question:
        return jsonify({'error': 'Question parameter is missing'}), 400

    response = get_gemini_response(question)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)