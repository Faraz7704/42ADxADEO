import psycopg2
import torch
from transformers import RagTokenizer, RagRetriever, RagSequenceForGeneration
import faiss
import numpy as np
import os

# Database connection details
DB_HOST = os.getenv('DB_HOST', 'ai-db')
DB_NAME = os.getenv('DB_NAME', 'ai_db')
DB_USER = os.getenv('DB_USER', 'admin')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'admin123')
DB_PORT = os.getenv('DB_PORT', 5432)

def fetch_documents():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    cursor = conn.cursor()

    # Fetch all documents from the documents table
    cursor.execute("SELECT id, filename, language, summary, category FROM documents")
    documents = cursor.fetchall()

    # Fetch all pages from the pages table
    cursor.execute("SELECT document_id, page_number, ocr_text, summary FROM pages")
    pages = cursor.fetchall()

    cursor.close()
    conn.close()

    return documents, pages

# Load the RAG model and tokenizer
rag_tokenizer = RagTokenizer.from_pretrained("facebook/rag-token-nq")
rag_model = RagSequenceForGeneration.from_pretrained("facebook/rag-token-nq")

# Function to preprocess text (for question embedding)
def preprocess_text(text):
    return rag_tokenizer(text=text, return_tensors="pt", padding=True, truncation=True)

# Function to create embeddings for documents
def embed_text(text):
    if text is not None and text.strip() != "":  # Check for None or empty strings
        inputs = preprocess_text(text)
        with torch.no_grad():
            embeddings = rag_model.question_encoder(**inputs).last_hidden_state.mean(dim=1)
        return embeddings
    else:
        return None  # Return None if the text is empty

# Get the embedding dimension from the model
dimension = rag_model.question_encoder.config.hidden_size

# Create a FAISS index
index = faiss.IndexFlatL2(dimension)

# Fetch documents and create embeddings
documents, pages = fetch_documents()
document_embeddings = []
for doc in documents:
    doc_embedding = embed_text(doc[3])  # Assuming summary is at index 3
    if doc_embedding is not None:  # Ignore documents with empty summaries
        document_embeddings.append(doc_embedding.numpy())

# Add embeddings to the index
index.add(np.array(document_embeddings))

def retrieve_relevant_documents(query, top_k=5):
    query_embedding = embed_text(query)
    if query_embedding is not None:
        D, I = index.search(query_embedding.numpy(), top_k)
        return I  # Indices of the top-k documents
    else:
        return []  # Return an empty list if the query is empty

def generate_response(query):
    relevant_doc_indices = retrieve_relevant_documents(query)
    relevant_docs = [documents[i] for i in relevant_doc_indices]

    # **Crucial Change:** Split the context into a list of passages
    passages = [doc[3] for doc in relevant_docs if doc[3] is not None and doc[3].strip() != ""]

    # Use the RAG model to generate a response
    if passages:
        inputs = rag_tokenizer(query=query, context=passages, return_tensors="pt", padding=True, truncation=True)
        outputs = rag_model.generate(**inputs)
        return rag_tokenizer.decode(outputs[0], skip_special_tokens=True)
    else:
        return "No relevant documents found."

# This is for retrieving the titles (filenames) of relevant documents
def get_relevant_file_titles(query):
    relevant_doc_indices = retrieve_relevant_documents(query)
    relevant_filenames = [documents[i][1] for i in relevant_doc_indices]
    return relevant_filenames

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route ("/", methods=["GET", "POST"])
def index():
    response

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route ("/", methods=["GET", "POST"])
def index():
    response = ""
    titles = []
    if request.method == "POST":
        query = request.form["query"]
        response = generate_response(query)
        titles = get_relevant_file_titles(query)
    return render_template("index.html", response=response, titles=titles)

if __name__ == "__main__":
    app.run(debug=True)