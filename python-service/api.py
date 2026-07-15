print("STEP 1")

from fastapi import FastAPI
print("STEP 2")

from main import run_pipeline
print("STEP 3")

from pydantic import BaseModel
print("STEP 4")

from core.rag_engine import ask_question
print("STEP 5")

from fastapi.middleware.cors import CORSMiddleware
print("STEP 6")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://YOUR-VERCEL-DOMAIN.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProcessRequest(BaseModel):
    chatId: str
    source: str

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
