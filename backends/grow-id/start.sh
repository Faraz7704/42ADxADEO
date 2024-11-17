#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Run migrations using ts-node
echo "Running migrations..."
npx ts-node -r tsconfig-paths/register ./src/config/typeorm.config.ts

# Start the application
echo "Starting the application..."
npm run start
