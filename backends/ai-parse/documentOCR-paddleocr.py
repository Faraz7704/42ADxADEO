from paddleocr import PaddleOCR,draw_ocr
# Paddleocr supports Chinese, English, French, German, Korean and Japanese.
# You can set the parameter `lang` as `ch`, `en`, `fr`, `german`, `korean`, `japan`
# to switch the language model in order.

# Initialize PaddleOCR for English
ocr = PaddleOCR(use_angle_cls=True, lang='en', use_gpu=0)  # Set use_gpu=True if you have a GPU
img_path = './tests/testImages/english_example.png'

# Perform OCR
result = ocr.ocr(img_path, cls=True)

# Initialize a list to store filtered recognized texts
filtered_texts = []

# Set a confidence threshold
confidence_threshold = 0.6  # 60%

# Process results and filter by confidence level
for idx in range(len(result)):
    res = result[idx]
    for line in res:
        text = line[1][0]  # Recognized text
        confidence = line[1][1]  # Confidence score
        if confidence >= confidence_threshold:
            filtered_texts.append(text)  # Store text if confidence is above threshold

# Concatenate all filtered texts into a single sentence
final_text = " ".join(filtered_texts)

# Print the concatenated result
print("Filtered Text:", final_text)