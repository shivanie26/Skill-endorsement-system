#!/bin/bash

echo "=================================="
echo "Skill Endorsement System Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB..."
if ! pgrep -x mongod > /dev/null
then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   Windows: net start MongoDB"
    echo "   Mac/Linux: sudo systemctl start mongod"
else
    echo "✅ MongoDB is running"
fi
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"
echo ""

# Frontend setup
echo "📦 Setting up Frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

echo "=================================="
echo "✅ Setup Complete!"
echo "=================================="
echo ""
echo "To start the application:"
echo ""
echo "1. Start Backend (in one terminal):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "2. Start Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
