import os
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from core.vector_store import create_vector_store, load_vector_store, get_retriever

def get_llm():
    return ChatMistralAI(
        model="mistral-small-latest",
        mistral_api_key=os.getenv("MISTRAL_API_KEY"),
        temperature=0.3,
    )

def format_docs(docs):
    return "\n".join([doc.page_content for doc in docs])

# This is creating the rag_chain while creating the vector store
def build_rag_chain(transcript: str, chat_id: str):
    vector_store = create_vector_store(transcript, chat_id)

    retriever = get_retriever(vector_store, k = 4)

    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages(
        [(
            "system",
            """You are an expert video assistant. Answer the user's questions
        based ONLY on the video transcript summaries and context provided below.

        If the answer is not found in the provided context, say:
        "I could not find this information in the video transcript summaries."

        Do not make up information or use external knowledge.

        Always be concise, accurate, and relevant. If the video mentions a speaker,
        creator, or presenter, clearly attribute statements to them when appropriate.

        Context from video transcript summaries:
        {context}"""
        ), ("human", "{question}")]
    )

    # In this user's query will be given to both triever and runnable passthrough
    rag_chain = (
        {
            "context": retriever | RunnableLambda(format_docs), 
            "question": RunnablePassthrough()
        }
        | prompt | llm | StrOutputParser()
    )

    return rag_chain

# This will give rag_chain for already loaded vector store
def load_rag_chain(chat_id: str):
    vector_store = load_vector_store(chat_id)

    retriever = get_retriever(vector_store, k = 4)

    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages(
        [(
            "system",
            """You are an expert video assistant. Answer the user's questions
        based ONLY on the video transcript summaries and context provided below.

        If the answer is not found in the provided context, say:
        "I could not find this information in the video transcript summaries."

        Do not make up information or use external knowledge.

        Always be concise, accurate, and relevant. If the video mentions a speaker,
        creator, or presenter, clearly attribute statements to them when appropriate.

        Context from video transcript summaries:
        {context}"""
        ), ("human", "{question}")]
    )

    # In this user's query will be given to both retriever and runnable passthrough
    rag_chain = (
        {
            "context": retriever | RunnableLambda(format_docs), 
            "question": RunnablePassthrough()
        }
        | prompt | llm | StrOutputParser()
    )

    return rag_chain

def ask_question(chat_id: str, question: str) -> str:
    rag_chain = load_rag_chain(chat_id)

    answer = rag_chain.invoke(question)
    print(f"answer :{answer}")
    return answer

