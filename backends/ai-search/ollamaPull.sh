#!/bin/bash

echo "Starting Ollama server..."
ollama serve &


echo "Waiting for Ollama server to be active..."
while [ "$(ollama list | grep 'NAME')" == "" ]; do
  sleep 1
done

ollama pull hf.co/CompendiumLabs/bge-base-en-v1.5-gguf && \
    ollama pull hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF