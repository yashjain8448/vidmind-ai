from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
import os 
import json

def get_llm():
    return ChatMistralAI(
        model = "mistral-small-latest", mistral_api_key = os.getenv("MISTRAL_API_KEY"),temperature=0.2
    )


def build_chain(system_prompt : str):
    llm = get_llm()
    return (
        RunnablePassthrough() | RunnableLambda(lambda x : {"text" : x}) |ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human","{text}"),
    ]) | llm |StrOutputParser()
    )


def extract_action_items(transcript:str)->str:
    chain = build_chain(
        """
        You are an expert meeting analyst.

        Return ONLY valid JSON in this format:

        {{
            "action_items": [
                "...",
                "...",
                "..."
            ]
        }}

        Rules:
        - Do not use markdown.
        - Do not use numbering.
        - Do not include headings.
        - Each item should be concise.
        - Ignore greetings, introductions, sponsorships and outros.
        - If no action items exist, return:
        {{
            "action_items": []
        }}

        Return ONLY valid JSON.
        """
        )

    response = chain.invoke(transcript)
    return json.loads(response)


def extract_key_decisions(transcript: str) -> str:
    chain = build_chain(
        """
        You are an expert meeting analyst.

        Return ONLY valid JSON.

        {{
            "key_decisions": [
                "...",
                "...",
                "..."
            ]
        }}

        Rules:
        - No markdown.
        - No numbering.
        - No headings.
        - If none exist, return an empty array.
        - Return ONLY valid JSON.
        """
    )

    response = chain.invoke(transcript)
    return json.loads(response)


def extract_questions(transcript: str) -> str:
    chain = build_chain(
        """
        You are an expert meeting analyst.

        Return ONLY valid JSON.

        {{
            "open_questions": [
                "...",
                "..."
            ]
        }}

        Rules:
        - No markdown.
        - No numbering.
        - No headings.
        - If none exist, return an empty array.
        - Return ONLY valid JSON.
        """
    )

    response = chain.invoke(transcript)
    return json.loads(response)