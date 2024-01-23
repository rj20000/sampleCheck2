import speech_recognition as sr

r = sr.Recognizer()


with sr.Microphone() as source:
     print("Speak Now!")
     audio = r.listen(source)
     try:
          speech_text = r.recognize_google(audio)
          print(speech_text)
     except sr.UnknownValueError:
          print("could not understand")
     except sr.RequestError:
          print("Could not request result from google")



