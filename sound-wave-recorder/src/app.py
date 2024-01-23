from flask import Flask, request, jsonify
import speech_recognition as sr

app = Flask(__name__)
recognizer = sr.Recognizer()

@app.route('/recognize-speech', methods=['POST'])
def recognize_speech():
    audio_data = request.files['audio'].read()

    with sr.AudioFile(audio_data) as source:
        try:
            audio = recognizer.record(source)
            speech_text = recognizer.recognize_google(audio)
            return jsonify({'result': speech_text})
        except sr.UnknownValueError:
            return jsonify({'error': 'Could not understand'})
        except sr.RequestError:
            return jsonify({'error': 'Could not request result from Google'})
if __name__ == '__main__':
    app.run(debug=True)
