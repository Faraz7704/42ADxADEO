

curl -X POST http://172.17.0.2:5000/summarize \
-H "Content-Type: text/plain" \
-d "$1"