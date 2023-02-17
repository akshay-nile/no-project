import os, time
from flask import Flask, request
from flask_cors import cross_origin
from speech_recognition import Recognizer, AudioFile
from threading import Thread

app = Flask(__name__)
recognizer = Recognizer()


def delete_after_delay(filename):
    try:
        time.sleep(1)
        os.remove(filename)
    except Exception as e:
        print(e)


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
            Thread(target=delete_after_delay, args=(filename,)).start()
            return text
        except Exception as e:
            return 'Error while transcription: ' + str(e)
        
    return 'Something Went Wrong !'


app.run(host='127.0.0.1', debug=True)
