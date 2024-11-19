# Use the official PostgreSQL image
FROM postgres:14

# Set environment variables for PostgreSQL
ENV DB_HOST=ai-db
ENV DB_PORT=5432
ENV DB_NAME=ai_db
ENV DB_USER=admin
ENV DB_PASSWORD=admin123

# Copy the database initialization script
COPY init_db.sh /docker-entrypoint-initdb.d



# Expose the default PostgreSQL port
EXPOSE 5432
