# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the Next.js port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
