from flask import Flask, request, jsonify
from paddleocr import PaddleOCR
from pdf2image import convert_from_path
from PIL import Image
import numpy as np
import tempfile
import psycopg2
import os
import requests  # Import requests to call the summarization API

app = Flask(__name__)

confidence_threshold = 0.6  # Confidence threshold of 60%

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

def get_ocr_instance():
    """Initialize a new instance of PaddleOCR."""
    return PaddleOCR(use_angle_cls=True, lang='en', use_gpu=True)

def convert_to_np_array(image):
    """Convert a PIL Image to a NumPy array in RGB format."""
    if image.mode != 'RGB':
        image = image.convert('RGB')
    return np.array(image)

def extract_text_from_np_image(np_image):
    """Extract text using PaddleOCR from a NumPy array."""
    ocr = get_ocr_instance()  # Initialize a fresh OCR instance
    result = ocr.ocr(np_image, cls=True)
    extracted_text = []
    for line in result:
        for word_info in line:
            confidence = word_info[1][1]
            if confidence >= confidence_threshold:
                extracted_text.append(word_info[1][0])
    return " ".join(extracted_text)

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file by converting each page to an image."""
    images = convert_from_path(pdf_path)
    extracted_texts = []
    for image in images:
        np_image = convert_to_np_array(image)
        text = extract_text_from_np_image(np_image)
        extracted_texts.append(text)
    return extracted_texts

@app.route('/upload', methods=['POST'])
def upload_file():
    """API endpoint to upload an image or PDF file for OCR."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Initialize variables for document details
    document_id = None
    extracted_texts = []
    language = 'en'  # Assuming English for simplicity

    # Process image files
    if file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        image = Image.open(file.stream)
        np_image = convert_to_np_array(image)
        extracted_text = extract_text_from_np_image(np_image)
        extracted_texts.append(extracted_text)

    # Process PDF files
    elif file.filename.lower().endswith('.pdf'):
        with tempfile.NamedTemporaryFile(delete=True, suffix='.pdf') as temp_pdf_file:
            file.save(temp_pdf_file.name)
            extracted_texts = extract_text_from_pdf(temp_pdf_file.name)

    else:
        return jsonify({"error": "Unsupported file type"}), 400

    # Insert document into the database
    conn = get_db_connection()
    try:
        with conn:
            with conn.cursor() as cursor:
                # Insert document with NULL summary and empty category
                cursor.execute(
                    "INSERT INTO documents (filename, language) VALUES (%s, %s) RETURNING id;",
                    (file.filename, language)
                )
                document_id = cursor.fetchone()[0]

                # Initialize a list to hold page summaries
                page_summaries = []

                # Insert each page's OCR text into the pages table and summarize it
                for page_number, ocr_text in enumerate(extracted_texts, start=1):
                    cursor.execute(
                        "INSERT INTO pages (document_id, page_number, ocr_text) VALUES (%s, %s, %s) RETURNING id;",
                        (document_id, page_number, ocr_text)
                    )
                    page_id = cursor.fetchone()[0]

                    # Call the summarization API for each page's OCR text
                    response = requests.post('http://ai-summary:5000/summarize', data=ocr_text)
                    if response.status_code == 200:
                        summary = response.json().get('summary')
                        page_summaries.append(summary)

                        # Update the page summary in the database
                        cursor.execute(
                            "UPDATE pages SET summary = %s WHERE id = %s;",
                            (summary, page_id)
                        )
                    else:
                        print(f"Error summarizing page {page_id}: {response.json().get('error')}")

                # Step 3: Generate a document summary from the page summaries
                combined_summary = " ".join(page_summaries)
                if combined_summary:
                    # Call the summarization API to summarize the combined summaries
                    response = requests.post('http://ai-summary:5000/summarize', data=combined_summary)
                    if response.status_code == 200:
                        document_summary = response.json().get('summary')
                        # Update the document summary in the documents table
                        cursor.execute(
                            "UPDATE documents SET summary = %s WHERE id = %s;",
                            (document_summary, document_id)
                        )
                    else:
                        print(f"Error summarizing document {document_id}: {response.json().get('error')}")

        return jsonify({
            "message": "Document processed successfully",
            "document_id": document_id,
            "extracted_text": extracted_texts
        })
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Couldn't update database"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')