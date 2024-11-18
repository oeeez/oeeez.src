#!/bin/bash

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    printf "${!1}%s${NC}\n" "$2"
}

# Function to confirm action
confirm() {
    read -p "$1 (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        return 0
    else
        return 1
    fi
}

# Function to remove test configurations
remove_test_configs() {
    print_color "YELLOW" "Removing test configurations..."
    
    # Update next.config.js
    sed -i 's/domains: \['"'"'placeholder.com'"'"'\]/domains: []/' frontend/next.config.js
    
    # Update package.json
    sed -i '/"dev": "next dev",/d' frontend/package.json
    sed -i '/"lint": "next lint"/d' frontend/package.json
    
    print_color "GREEN" "Test configurations removed successfully."
}

# Function to remove example code
remove_example_code() {
    print_color "YELLOW" "Removing example code..."
    
    # Remove dummy data from ProductList component
    sed -i '/const dummyProducts = \[/,/\]/d' frontend/src/components/marketplace/ProductList.tsx
    sed -i 's/{dummyProducts.map((product) => (/{ \/\* Add your actual product data mapping here \*\/ }/' frontend/src/components/marketplace/ProductList.tsx
    
    # Remove dummy data from GameList component
    sed -i '/const dummyGames = \[/,/\]/d' frontend/src/components/games/GameList.tsx
    sed -i 's/{dummyGames.map((game) => (/{ \/\* Add your actual game data mapping here \*\/ }/' frontend/src/components/games/GameList.tsx
    
    # Remove dummy data from TransactionList component
    sed -i '/const dummyTransactions: Transaction\[] = \[/,/\]/d' frontend/src/components/banking/TransactionList.tsx
    sed -i 's/{dummyTransactions.map((transaction) => (/{ \/\* Add your actual transaction data mapping here \*\/ }/' frontend/src/components/banking/TransactionList.tsx
    
    print_color "GREEN" "Example code removed successfully."
}

# Main script execution
print_color "GREEN" "Starting production preparation script..."

if confirm "Do you want to remove test configurations?"; then
    remove_test_configs
fi

if confirm "Do you want to remove example code?"; then
    remove_example_code
fi

print_color "GREEN" "Production preparation complete!"
