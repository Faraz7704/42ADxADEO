#!/bin/bash
# Start PostgreSQL service
service postgresql start

# Run the main command (you can replace it with your application start command)
exec "$@"