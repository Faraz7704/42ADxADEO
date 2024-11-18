import requests
import torch
from PIL import Image
from transformers import MllamaForConditionalGeneration, AutoProcessor

model_id = "meta-llama/Llama-3.2-11B-Vision-Instruct"

model = MllamaForConditionalGeneration.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
    device_map="cuda:0"
)
processor = AutoProcessor.from_pretrained(model_id)

# url = "https://huggingface.co/datasets/huggingface/documentation-images/resolve/0052a70beed5bf71b92610a43a52df6d286cd5f3/diffusers/rabbit.jpg"
url = "https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_d69ffc0317c5d488605bff70bc85e9019474f0c8.jpg"

image = Image.open(requests.get(url, stream=True).raw)


messages = [
    {"role": "user", "content": [
        {"type": "image"},
        {"type": "text", "text": "What is the photo about? What type of document is it from? Be short."}
    ]}
]

input_text = processor.apply_chat_template(messages, add_generation_prompt=True)
inputs = processor(
    image,
    input_text,
    add_special_tokens=False,
    return_tensors="pt"
).to(model.device)

output = model.generate(**inputs, max_new_tokens=100)

messages = [
    {"role": "user", "content": [
        {"type": "image"},
        {"type": "text", "text": "Tell me the details in the photo."}
    ]}
]

input_text = processor.apply_chat_template(messages, add_generation_prompt=True)
inputs = processor(
    image,
    input_text,
    add_special_tokens=False,
    return_tensors="pt"
).to(model.device)

output += model.generate(**inputs, max_new_tokens=1000)

print(processor.decode(output[0]))
