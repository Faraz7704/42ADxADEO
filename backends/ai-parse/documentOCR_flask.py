from flask import Flask, request, jsonify
from paddleocr import PaddleOCR
from pdf2image import convert_from_path
from PIL import Image
import numpy as np
import tempfile

app = Flask(__name__)

confidence_threshold = 0.6  # Confidence threshold of 60%

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
    ocr = get_ocr_instance()  # Initialize a fresh OCR instance
    images = convert_from_path(pdf_path)
    extracted_text = []
    for image in images:
        np_image = convert_to_np_array(image)
        text = extract_text_from_np_image(np_image)
        extracted_text.append(text)
    return "\n".join(extracted_text)

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
        image = Image.open(file.stream)
        np_image = convert_to_np_array(image)
        extracted_text = extract_text_from_np_image(np_image)
        return jsonify({"extracted_text": extracted_text})

    # Process PDF files
    elif file.filename.lower().endswith('.pdf'):
        with tempfile.NamedTemporaryFile(delete=True, suffix='.pdf') as temp_pdf_file:
            file.save(temp_pdf_file.name)
            extracted_text = extract_text_from_pdf(temp_pdf_file.name)
            return jsonify({"extracted_text": extracted_text})

    return jsonify({"error": "Unsupported file type"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
