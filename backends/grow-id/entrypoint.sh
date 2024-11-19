#!/bin/sh

# Run migrations before starting the app
npm run migration:generate
npm run migration:run

# Start the application
exec "$@"
