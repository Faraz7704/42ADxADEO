# Use the official PostgreSQL image
FROM postgres:14

# Set environment variables for PostgreSQL
ENV POSTGRES_DB=ai_parse
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin123

# Copy the database initialization script
COPY init_db.sh /tmp/

# Expose the default PostgreSQL port
EXPOSE 5432
