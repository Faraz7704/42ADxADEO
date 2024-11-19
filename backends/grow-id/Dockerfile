# Use Node.js base image
FROM node:18-alpine

# Install Python and build tools using apk
RUN apk add --no-cache python3 py3-pip build-base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

# Install dependencies and rebuild bcrypt
RUN npm install && npm rebuild bcrypt --build-from-source

# Copy application files
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/

# Make it executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["entrypoint.sh"]

# Build the application (Move this after copying source files)
RUN npm run build

# Expose port (Replace with your app's port if necessary)
EXPOSE ${PORT}

# Start the microservice
CMD ["npm", "run", "start:prod"]
