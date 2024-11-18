#!/bin/bash

set -euo pipefail

echo "Setting up Oeeez.online project..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Setup environment variables
echo "Setting up environment variables..."
cp config/.env.example .env
echo "Please update the .env file with your specific configuration."

# Initialize database
echo "Initializing database..."
npm run db:init

# Run database migrations
echo "Running database migrations..."
npm run db:migrate

echo "Setup complete! You can now start the development server with 'npm run dev'."
