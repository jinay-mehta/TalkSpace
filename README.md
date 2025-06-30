# TalkSpace 💬

A real-time chat application for business professionals with group chats, user authentication, and instant messaging.

![TalkSpace](https://img.shields.io/badge/TalkSpace-Real--time%20Chat-blue?style=for-the-badge&logo=chat)

## ✨ Features

- 🔐 User Authentication with JWT
- 💬 Real-time messaging with Socket.io
- 👥 Group chat creation and management
- 🔍 User search functionality
- 📱 Responsive design
- 🔔 Real-time notifications
- 👤 User profiles

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Socket.io, JWT
**Frontend:** React.js, Chakra UI, Socket.io-client


## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/jinay-mehta/TalkSpace.git
   cd TalkSpace
   ```

2. **Backend Setup**
   ```bash
   # Install backend dependencies
   npm install
   
   # Create environment file
   cd backend
   # Create .env file with your database credentials
   ```

3. **Frontend Setup**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   Create `.env` file in `backend/` directory:
   ```env
   # For Local MongoDB
   MONGO_URI=mongodb://localhost:27017/talkspace
   
   # For MongoDB Atlas (Cloud)
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/talkspace
   
   JWT_SECRET=your_secret_key_here
   ```

5. **Run Application**
   ```bash
   # Terminal 1 - Start Backend (from root directory)
   cd backend
   node server.js
   
   # Terminal 2 - Start Frontend (from root directory)
   cd frontend
   npm start
   ```

Visit `http://localhost:3000` to start chatting!




