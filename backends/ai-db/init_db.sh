#!/bin/bash
set -e

# Create tables in the PostgreSQL database
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE pages (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id),
    page_number INTEGER NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    ocr_text TEXT,
    blip_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);"
