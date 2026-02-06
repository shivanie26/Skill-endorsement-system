# Skill Endorsement System

A full-stack web application for endorsing and managing user skills, similar to LinkedIn's endorsement feature.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT
- **Skill Management**: Add, view, and remove personal skills
- **Endorsement System**: Endorse other users' skills with optional messages
- **User Search**: Find users by name, email, or skills
- **Dashboard**: View received and given endorsements
- **User Profiles**: Detailed view of user skills and endorsements

## 🛠️ Technology Stack

### Backend
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Context API for state management
- Custom CSS (Tailwind-inspired)

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn

## ⚙️ Installation & Setup

### 1. Clone or Download the Project
```bash
cd skill-endorsement-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Update .env file with your MongoDB connection string
# The default is: mongodb://localhost:27017/skill-endorsement

# Start MongoDB (if not already running)
# On Windows: net start MongoDB
# On Mac/Linux: sudo systemctl start mongod

# Run the backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

Frontend will run on `http://localhost:3000`

## 🔑 Default Test Users

You can create users through the registration page. No default users are provided.

## 📱 Usage Guide

### 1. Register/Login
- Navigate to `http://localhost:3000`
- Register a new account or login
- You'll be redirected to the dashboard

### 2. Add Skills
- Go to "My Profile"
- Add your skills with categories
- Skills will appear in your profile

### 3. Endorse Others
- Go to "Find Users"
- Search for users by name or skill
- Click on a skill badge to endorse
- Add an optional message

### 4. View Dashboard
- See all endorsements you've received
- View endorsements you've given
- Track your top skills

## 📁 Project Structure

```
skill-endorsement-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── userController.js     # User management
│   │   ├── skillController.js    # Skill management
│   │   └── endorsementController.js # Endorsement logic
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Endorsement.js       # Endorsement schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── users.js             # User routes
│   │   ├── skills.js            # Skill routes
│   │   └── endorsements.js      # Endorsement routes
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Main server file
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   └── PrivateRoute.js
    │   ├── context/
    │   │   └── AuthContext.js    # Authentication context
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── Profile.js
    │   │   ├── Users.js
    │   │   ├── UserDetail.js
    │   │   └── *.css             # Page styles
    │   ├── services/
    │   │   └── api.js            # API service functions
    │   ├── App.js                # Main App component
    │   ├── index.js              # Entry point
    │   └── index.css             # Global styles
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users` - Get all users (with search)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update profile (protected)

### Skills
- `GET /api/skills` - Get user's skills (protected)
- `POST /api/skills` - Add new skill (protected)
- `DELETE /api/skills/:skillId` - Remove skill (protected)

### Endorsements
- `POST /api/endorsements` - Create endorsement (protected)
- `GET /api/endorsements/received` - Get received endorsements (protected)
- `GET /api/endorsements/given` - Get given endorsements (protected)
- `GET /api/endorsements/count/:userId` - Get endorsement count by skill
- `DELETE /api/endorsements/:id` - Delete endorsement (protected)

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the connection string in `.env`
- Default: `mongodb://localhost:27017/skill-endorsement`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Change port in `package.json` or kill the process

### CORS Errors
- Make sure backend is running on port 5000
- Frontend proxy is configured in `package.json`

## 🎨 Customization

### Change Colors
Edit the CSS files in `frontend/src/pages/*.css` and `frontend/src/index.css`

### Add New Features
1. Create new routes in backend
2. Create new controllers
3. Add frontend pages and API calls

## 📝 For College Submission

### Documentation to Include:
1. This README file
2. Screenshots of:
   - Login/Register page
   - Dashboard
   - Profile with skills
   - User search
   - Endorsement modal
   - User detail page
3. Database schema diagram
4. System architecture diagram

### Presentation Points:
- Problem statement
- Tech stack explanation
- Features demonstration
- Code walkthrough
- Future enhancements

## 🚀 Future Enhancements

- Profile picture upload
- Email notifications
- Skill verification through tests
- Skill recommendations
- Export profile as PDF
- Social media integration
- Advanced analytics dashboard

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Created for college project submission.

---

**Good luck with your project! 🎓**
