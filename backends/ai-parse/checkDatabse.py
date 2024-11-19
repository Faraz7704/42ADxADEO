import psycopg2
import os

# Database connection parameters
DB_HOST = os.getenv('DB_HOST', 'localhost')  # Change to your host
DB_NAME = os.getenv('DB_NAME', 'ai_db')       # Change to your database name
DB_USER = os.getenv('DB_USER', 'admin')       # Change to your database user
DB_PASSWORD = os.getenv('DB_PASSWORD', 'admin123')  # Change to your database password
DB_PORT = os.getenv('DB_PORT', 5432)           # Change to your database port

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

def view_documents_and_pages():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Fetch all documents
        cursor.execute("SELECT * FROM documents;")
        documents = cursor.fetchall()
        print("Documents:")
        for doc in documents:
            print(doc)

        # Fetch all pages
        cursor.execute("SELECT * FROM pages;")
        pages = cursor.fetchall()
        print("\nPages:")
        for page in pages:
            print(page)

    except Exception as e:
        print(f'An error occurred: {e}')
    finally:
        cursor.close()
        conn.close()

# Call the function to view the data
view_documents_and_pages()