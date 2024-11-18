from flask import Flask, request, jsonify
from paddleocr import PaddleOCR
from pdf2image import convert_from_path
from PIL import Image
import os
import tempfile

app = Flask(__name__)

# Initialize PaddleOCR
ocr = PaddleOCR(use_angle_cls=True, lang='en', use_gpu=False)  # Set use_gpu=True if you have a GPU

confidence_threshold = 0.6  # 60%

def extract_text_from_image(image):
    """Extract text from a single image using PaddleOCR."""
    result = ocr.ocr(image, cls=True)
    extracted_text = []
    for line in result:
        for word_info in line:
            confidence = word_info[1][1]  # Confidence score
            if confidence >= confidence_threshold:
                extracted_text.append(word_info[1][0])  # Append recognized text
    return " ".join(extracted_text)  # Combine into a single string

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file by converting each page to an image."""
    images = convert_from_path(pdf_path)
    extracted_text = []
    for image in images:
        # Save the image temporarily
        with tempfile.NamedTemporaryFile(delete=True, suffix='.jpg') as temp_image_file:
            image.save(temp_image_file.name, 'JPEG')
            text = extract_text_from_image(temp_image_file.name)
            extracted_text.append(text)
    return "\n".join(extracted_text)  # Combine text from all pages

@app.route('/upload', methods=['POST'])
def upload_file():
    """API endpoint to upload an image or PDF file for OCR."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Process image files
    if file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        image = Image.open(file.stream)  # Open the image directly from the file stream
        extracted_text = extract_text_from_image(image)
        return jsonify({"extracted_text": extracted_text})

    # Process PDF files
    elif file.filename.lower().endswith('.pdf'):
        # Save the PDF temporarily
        with tempfile.NamedTemporaryFile(delete=True, suffix='.pdf') as temp_pdf_file:
            file.save(temp_pdf_file.name)
            extracted_text = extract_text_from_pdf(temp_pdf_file.name)
            return jsonify({"extracted_text": extracted_text})

    return jsonify({"error": "Unsupported file type"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')