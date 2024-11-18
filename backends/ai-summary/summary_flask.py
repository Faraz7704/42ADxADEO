from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Initialize the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0)

@app.route('/summarize', methods=['POST'])
def summarize_text():
    """API endpoint to summarize the provided text."""
    # Get the raw text from the request body
    text_input = request.data.decode('utf-8').strip()

    if not text_input:
        return jsonify({"error": "No text provided"}), 400

    # Generate summary
    try:
        summary = summarizer(text_input, max_length=130, min_length=30, do_sample=False)
        summary_text = summary[0]['summary_text']
        return jsonify({"summary": summary_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')