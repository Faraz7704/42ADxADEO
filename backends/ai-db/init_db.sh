#!/bin/bash
set -e

# Create tables in the PostgreSQL database
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    summary VARCHAR(420),
    category VARCHAR(100)
);

CREATE TABLE pages (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id),
    page_number INTEGER NOT NULL,
    ocr_text TEXT,
    summary TEXT,
    time_context TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);"
