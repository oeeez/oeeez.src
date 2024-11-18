#!/bin/bash

set -euo pipefail

echo "Building Oeeez.online project..."

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist

# Build backend
echo "Building backend..."
cd backend && npm run build && cd ..

# Build frontend
echo "Building frontend..."
cd frontend && npm run build && cd ..

# Run tests
echo "Running tests..."
npm test

echo "Build complete! You can now deploy the project using the deploy script."
