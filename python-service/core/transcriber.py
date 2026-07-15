import os
from dotenv import load_dotenv
import requests
from pydub import AudioSegment
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

   
def transcribe_chunk(chunk_path: str) -> str:
    try:
        with open(chunk_path, "rb") as audio_file:

            transcription = client.audio.transcriptions.create(
                file=audio_file,
                model="whisper-large-v3-turbo",
                response_format="verbose_json",
                language="en",
                temperature=0,
            )

        return transcription.text

    except Exception as e:
        print(f"Groq transcription failed: {e}")
        raise


# this will transcribe all the chunks and return the full transcript.
def transcribe_all(chunks: list) -> str:

    full_transcript = "" 

    print(f"Using Groq for transcription.")

    for i, chunk in enumerate(chunks):  
        print(f"Transcribing chunk {i + 1}/{len(chunks)}...")

        text = transcribe_chunk(chunk)  

        full_transcript += text + " "  

    print("Transcription complete.")
    return full_transcript.strip()  
