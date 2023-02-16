import os
from flask import Flask, request
from flask_cors import cross_origin
from speech_recognition import Recognizer, AudioFile

app = Flask(__name__)
recognizer = Recognizer()

@app.route('/transcript', methods=['POST'])
@cross_origin()
def transcript():
    filename = request.args.get('emailId') + '.wav'
    language = request.args.get('language') or 'en'
    try:
        with open(filename, 'wb') as file:
            file.write(request.get_data())
    except Exception as e:
        return 'Error while saving the file: ' + str(e)
       
    with AudioFile(filename) as source:
        try:
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio, language=language)
            return text
        except Exception as e:
            return 'Error while transcription: ' + str(e)
        
    return 'Something Went Wrong !'


app.run(debug=True)
