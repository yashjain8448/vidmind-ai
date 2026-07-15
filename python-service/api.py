from fastapi import FastAPI
from main import run_pipeline
from pydantic import BaseModel
from core.rag_engine import load_rag_chain, ask_question

app = FastAPI()

class ProcessRequest(BaseModel):
    chatId: str
    source: str
    language: str = "english"

@app.get("/")
def home():
    return {
        "message": "AI Video Assistant API is running 🚀"
    }

@app.post("/process")
def process_video(request: ProcessRequest):
    result = run_pipeline(
        request.chatId,
        request.source
    )

    return result

class ChatRequest(BaseModel):
    chatId: str
    question: str


@app.post("/chat")
def chat_with_video(request: ChatRequest):

    answer = ask_question(
        request.chatId,
        request.question
    )

    return {
        "answer": answer
    }