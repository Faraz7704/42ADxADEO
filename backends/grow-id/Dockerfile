# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Copy .env file for environment variables
COPY .env .env

# Copy the start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Build the application
RUN npm run build

# Run the start script
CMD ["./start.sh"]

# Expose port
EXPOSE 4000
