from dotenv import load_dotenv
from utils.audio_processor import process_input
from core.transcriber import transcribe_all
from core.summarizer import summarize_transcript, generate_title
from core.extractor import extract_action_items, extract_key_decisions, extract_questions
from core.rag_engine import build_rag_chain


load_dotenv()

def run_pipeline(chat_id: str, source: str) -> dict:
    print("Starting AI Video Assistant")

    chunks = process_input(source)

    transcript = transcribe_all(chunks)

    title = generate_title(transcript)

    summary = summarize_transcript(transcript)

    action_items = extract_action_items(transcript)
    decisions = extract_key_decisions(transcript)
    questions = extract_questions(transcript)

    rag_chain = build_rag_chain(transcript, chat_id)

    return {
        "title": title,
        "transcript": transcript,
        "summary": summary["summary"],
        "action_items": action_items["action_items"],
        "key_decisions": decisions["key_decisions"],
        "open_questions": questions["open_questions"],
    }
