from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_text_splitters import RecursiveCharacterTextSplitter
import json
import os

def get_llm():
    return ChatMistralAI(
        model = "mistral-small-latest", mistral_api_key = os.getenv("MISTRAL_API_KEY"), temperature = 0.3
    )

# It will split the transcript into smaller chunks
def split_transcript(transcript: str) -> list:
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=200)

    return text_splitter.split_text(transcript)

def summarize_transcript(transcript: str) -> str:
    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant that summarizes the given portion of video transcripts."),
        ("human", "Summarize the following {transcript_chunk}")
    ])

    summarization_chain = prompt | llm | StrOutputParser()

    chunks = split_transcript(transcript)

    # This will contain all the summaries of the transcript chunks
    chunk_summaries = [summarization_chain.invoke({"transcript_chunk": chunk}) for chunk in chunks]

    combined_summary = "\n".join(chunk_summaries)

    combined_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
        You are an expert video summarizer.

        Return ONLY valid JSON.

        The JSON must have exactly this structure:

        {{
            "summary": [
                "point 1",
                "point 2",
                "point 3"
            ]
        }}

        Rules:
        - Do not use markdown.
        - Do not use code fences.
        - Do not include headings.
        - Summary should contain 5-8 concise bullet points.
        - Ignore greetings, sponsorships, advertisements, and subscribe requests.
        - Focus only on the educational or informative content.
        - Return ONLY valid JSON.
        """
            ),
            (
                "human",
                "Summarize the following transcript summary:\n{combined_summary}"
            ),
    ])

    combined_summarization_chain = combined_prompt | llm | StrOutputParser()

    response =  combined_summarization_chain.invoke({"combined_summary": combined_summary})
    return json.loads(response)


# This function will give a title to the transcript
def generate_title(transcript: str) -> str:
    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant that generates a concise and descriptive title for the given video transcript. You generate a title in not more than 8 words. And you only return the title without any additional text."),
        ("human", "Generate a title for the following video transcript: {transcript}")
    ])

    title_chain = prompt | llm | StrOutputParser()

    return title_chain.invoke({"transcript": transcript})