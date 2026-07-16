import yt_dlp
from pydub import AudioSegment
import os

DOWNLOAD_DIR = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "downloads"
)

os.makedirs(DOWNLOAD_DIR, exist_ok=True) # Create the download directory if it doesn't exist

# This is the function specifically for youtube urls
def download_youtube_audio(url :str) -> str:
    # path to save the downloaded audio file
    output_path = os.path.join(DOWNLOAD_DIR, '%(title)s.%(ext)s')

    # yt-dlp options to download the best audio quality and convert it to wav format
    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": output_path,

        "quiet": True,
        "noplaylist": True,

        "extractor_args": {
            "youtube": {
                "player_client": ["android", "web"]
            }
        },

        "http_headers": {
            "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36"
        },

        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "wav",
            "preferredquality": "192",
        }]
    }

    # Download the audio and convert it to wav format
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)

        print("Prepared filename:", ydl.prepare_filename(info))
        print("Download directory:", DOWNLOAD_DIR)
        print("Files after download:", os.listdir(DOWNLOAD_DIR))

        base = os.path.splitext(ydl.prepare_filename(info))[0]
        filename = base + ".wav"

    print("Expected wav:", filename)
    print("WAV exists:", os.path.exists(filename))
    print("Returning:", filename)

    return filename

# If the input file is not in wav format, convert it to wav using pydub
def convert_to_wav(input_path: str) -> str:
    """Convert any audio/video file to WAV format using pydub."""
    output_path = os.path.splitext(input_path)[0] + "_converted.wav"
    audio = AudioSegment.from_file(input_path) # Load the audio file using pydub
    audio = audio.set_channels(1).set_frame_rate(16000) #16khz mono is the recommended format for whisper
    audio.export(output_path, format="wav")
    return output_path

# The video/audio file can be quite long so split it into chunks of 10 minutes
def chunk_audio(wav_path : str , chunk_minutes : int = 10) -> list:
    audio = AudioSegment.from_wav(wav_path)
    chunk_ms = chunk_minutes * 60 * 1000 # Convert minutes to milliseconds
    # Why ms ? Because pydub works with milliseconds for slicing audio segments. 

    chunks = []

    for i, start in enumerate(range(0,len(audio),chunk_ms)):
        chunk = audio[start : start + chunk_ms]
        chunk_path = f"{wav_path}_chunk_{i}.wav"
        chunk.export(chunk_path , format = "wav")

        chunks.append(chunk_path)
    
    return chunks

# This is the function that we will call to process the video/audio
# It will return the chunks 
def process_input(source: str) -> list:
    if source.startswith("http://") or source.startswith("https://"):
        print("Detected YouTube URL. Downloading audio...")
        wav_path = download_youtube_audio(source)
    else:
        print("Detected local file. Converting to WAV...")
        wav_path = convert_to_wav(source)

    print("Chunking audio...")
    chunks = chunk_audio(wav_path)
    print(f"Audio ready — {len(chunks)} chunk(s) created.")
    return chunks
