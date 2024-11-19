import ollama


import psycopg2
import os

# Database connection parameters
DB_HOST = os.getenv('DB_HOST', 'ai-db')
DB_NAME = os.getenv('DB_NAME', 'ai_db')
DB_USER = os.getenv('DB_USER', 'admin')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'admin123')
DB_PORT = os.getenv('DB_PORT', 5432)

def get_db_connection():
    """Create a new database connection."""
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn

def load_ocr_text_and_titles_from_db():
    dataset = []
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Execute a SQL query to fetch ocr_text, document_id, and document title
        cursor.execute("""
            SELECT p.document_id, d.filename, p.ocr_text 
            FROM pages p
            JOIN documents d ON p.document_id = d.id
        """)
        
        # Fetch all rows from the executed query
        rows = cursor.fetchall()
        
        # Process each row and append to the dataset
        for row in rows:
            dataset.append({
                'document_id': row[0],
                'filename': row[1],
                'ocr_text': row[2]
            })
        
        print(f'Loaded {len(dataset)} entries')
        
    except Exception as e:
        print(f'An error occurred: {e}')
    finally:
        cursor.close()
        conn.close()
        
    return dataset

# Load OCR text, document IDs, and titles from the database into the dataset variable
dataset = load_ocr_text_and_titles_from_db()


# Implement the retrieval system

EMBEDDING_MODEL = 'hf.co/CompendiumLabs/bge-base-en-v1.5-gguf'
LANGUAGE_MODEL = 'hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF'

# Each element in the VECTOR_DB will be a tuple (chunk, embedding)
# The embedding is a list of floats, for example: [0.1, 0.04, -0.34, 0.21, ...]
VECTOR_DB = []

def add_chunk_to_database(chunk):
    embedding = ollama.embed(model=EMBEDDING_MODEL, input=chunk)['embeddings'][0]
    VECTOR_DB.append((chunk, embedding))

for i, chunk in enumerate(dataset):
    add_chunk_to_database(chunk)
    print(f'Added chunk {i+1}/{len(dataset)} to the database')

def cosine_similarity(a, b):
    dot_product = sum([x * y for x, y in zip(a, b)])
    norm_a = sum([x ** 2 for x in a]) ** 0.5
    norm_b = sum([x ** 2 for x in b]) ** 0.5
    return dot_product / (norm_a * norm_b)

def retrieve(query, top_n=3):
    query_embedding = ollama.embed(model=EMBEDDING_MODEL, input=query)['embeddings'][0]
    # temporary list to store (chunk, similarity) pairs
    similarities = []
    for chunk, embedding in VECTOR_DB:
        similarity = cosine_similarity(query_embedding, embedding)
        similarities.append((chunk, similarity))
    # sort by similarity in descending order, because higher similarity means more relevant chunks
    similarities.sort(key=lambda x: x[1], reverse=True)
    # finally, return the top N most relevant chunks
    return similarities[:top_n]



# Chatbot

input_query = input('Ask me a question: ')
retrieved_knowledge = retrieve(input_query)

print('Retrieved knowledge:')
for chunk, similarity in retrieved_knowledge:
    print(f' - (similarity: {similarity:.2f}) {chunk}')

instruction_prompt = f'''You are a helpful chatbot.
Use only the following pieces of context to answer the question. Don't make up any new information:
{chr(10).join([f' - {chunk}' for chunk, similarity in retrieved_knowledge])}
'''

# print(instruction_prompt)

stream = ollama.chat(
    model=LANGUAGE_MODEL,
    messages=[
        {'role': 'system', 'content': instruction_prompt},
        {'role': 'user', 'content': input_query},
    ],
    stream=True,
)

# print the response from the chatbot in real-time
print('Chatbot response:')
for chunk in stream:
    print(chunk['message']['content'], end='', flush=True)