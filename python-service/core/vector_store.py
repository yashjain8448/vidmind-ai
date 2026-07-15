import os 
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

EMBEDDING_MODEL  = "all-MiniLM-L6-v2"
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

_client = None
_embedding_model = None

def get_client():
    global _client

    if _client is None:
        _client = QdrantClient(
            url=os.getenv("QDRANT_URL"),
            api_key=os.getenv("QDRANT_API_KEY"),
        )

    return _client

def get_embeddings_model():
    global _embedding_model

    if _embedding_model is None:
        _embedding_model = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL,
            model_kwargs={"device": "cpu"},
        )

    return _embedding_model


def create_vector_store(transcript: str, chat_id: str):

    embedding_model = get_embeddings_model()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_text(transcript)

    docs = [
        Document(
            page_content=chunk,
            metadata={"chunk_index": i}
        )
        for i, chunk in enumerate(chunks)
    ]

    collection_name = f"chat_{chat_id}"

    # Create collection if it doesn't exist
    collections = get_client().get_collections().collections

    vector_size = len(
        embedding_model.embed_query("hello")
    )

    if collection_name not in [c.name for c in collections]:

        get_client().create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(
                size=vector_size,
                distance=Distance.COSINE,
            ),
        )

    vector_store = QdrantVectorStore.from_documents(
        documents=docs,
        embedding=embedding_model,
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY,
        collection_name=collection_name,
    )

    return vector_store

def load_vector_store(chat_id: str):

    embedding_model = get_embeddings_model()

    collection_name = f"chat_{chat_id}"

    vector_store = QdrantVectorStore(
        client=get_client(),
        collection_name=collection_name,
        embedding=embedding_model,
    )

    return vector_store

# This will return a retriever object which can be used to retrieve relevant chunks from the vector store based on a query.
def get_retriever(vector_store, k: int = 4):
    return vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": k},
    )