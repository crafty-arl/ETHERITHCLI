#!/bin/bash

# Etherith CLI Installation Script
# This script installs and sets up the Etherith CLI tool

set -e

echo "🚀 Installing Etherith CLI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    echo "   Please update Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Link globally (optional)
read -p "🔗 Do you want to install etherith globally? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Installing globally..."
    npm link
    echo "✅ Etherith CLI installed globally! You can now use 'etherith' command anywhere."
else
    echo "ℹ️  Skipping global installation. Use 'node dist/cli.js' to run commands."
fi

# Test installation
echo "🧪 Testing installation..."
if command -v etherith &> /dev/null; then
    etherith --version
elif [ -f "dist/cli.js" ]; then
    node dist/cli.js --version
else
    echo "❌ Installation verification failed"
    exit 1
fi

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "   1. Create a new vault: etherith init my-vault"
echo "   2. Get Pinata credentials: https://pinata.cloud/"
echo "   3. Add your first file: etherith add <file>"
echo ""
echo "📚 Documentation:"
echo "   • README.md - Usage guide"
echo "   • API.md - API documentation"
echo "   • DEPLOYMENT.md - Deployment guide"
echo ""
echo "🆘 Need help? Visit: https://github.com/your-org/etherith-cli"
echo ""