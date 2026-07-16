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
            """You are an expert video assistant.

            Answer the user's questions using ONLY the provided video transcript context.

            Rules:
            - Do NOT use Markdown.
            - Do NOT use **bold**, *italics*, headings, code blocks, or special formatting.
            - Respond in plain text only.
            - Use short paragraphs when needed.
            - If listing multiple points, use simple numbered lists (1., 2., 3.) or hyphens (-).
            - Do not use emojis.
            - Do not use external knowledge.
            - If the answer is not present in the provided context, reply exactly:
            "I could not find this information in the video transcript."

            Always answer in a way that looks like a normal chat response.
            Avoid unnecessary formatting.
            Keep paragraphs short and readable.
            If the video mentions a speaker or presenter, attribute statements appropriately.

            Video Context:
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
            """You are an expert video assistant.

            Answer the user's questions using ONLY the provided video transcript context.

            Rules:
            - Do NOT use Markdown.
            - Do NOT use **bold**, *italics*, headings, code blocks, or special formatting.
            - Respond in plain text only.
            - Use short paragraphs when needed.
            - If listing multiple points, use simple numbered lists (1., 2., 3.) or hyphens (-).
            - Do not use emojis.
            - Do not use external knowledge.
            - If the answer is not present in the provided context, reply exactly:
            "I could not find this information in the video transcript."

            Always answer in a way that looks like a normal chat response.
            Avoid unnecessary formatting.
            Keep paragraphs short and readable.
            If the video mentions a speaker or presenter, attribute statements appropriately.

            Video Context:
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

