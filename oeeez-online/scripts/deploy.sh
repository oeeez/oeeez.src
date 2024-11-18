#!/bin/bash

set -euo pipefail

echo "Deploying Oeeez.online project..."

# Ensure we're on the main branch
git checkout main

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Build the project
npm run build

# Run database migrations
npm run db:migrate

# Restart the application
pm2 restart oeeez-online

echo "Deployment complete! The application should now be live."
