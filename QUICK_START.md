# ⚡ QUICK START GUIDE - 5 MINUTES TO RUNNING

## 🎯 What You Need
- Node.js installed (check: `node --version`)
- MongoDB installed (check: `mongod --version`)
- Two terminal windows

## 🚀 Steps

### Step 1: Extract & Navigate
```bash
cd skill-endorsement-system
```

### Step 2: Start MongoDB
**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# OR
mongod
```

### Step 3: Setup Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```

Wait for: "✅ MongoDB connected successfully" and "Server is running on port 5000"

### Step 4: Setup Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

Browser will open automatically at `http://localhost:3000`

### Step 5: Create Test Account
1. Click "Register here"
2. Fill in your details
3. Create account
4. Start using the app!

## 🎯 First Actions

1. **Add Skills:** Go to "My Profile" → Add 3-5 skills
2. **Create Another User:** Open incognito window → Register another user
3. **Endorse:** Go to "Find Users" → Endorse the first user's skills
4. **View Dashboard:** Check endorsements received

## ❗ Troubleshooting

**MongoDB not starting?**
- Install from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

**Port 3000 already in use?**
```bash
# Kill the process
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill
```

**Backend errors?**
- Check `.env` file in backend folder
- Make sure MongoDB connection string is correct

## 📱 Demo Flow

1. Register → Add skills → Search users → Endorse
2. Switch accounts (incognito) → Endorse back
3. View dashboard → See all endorsements

## 🎓 For Presentation

**Show these features:**
1. User registration & authentication
2. Adding skills with categories
3. Searching users by skill
4. Endorsing with personalized message
5. Dashboard with statistics
6. User profile with endorsement count

**Be ready to explain:**
- MERN stack architecture
- JWT authentication
- MongoDB schema
- React components
- API endpoints

---

## 🆘 Quick Help

**Can't start backend?**
- Make sure you ran `npm install` first
- Check if port 5000 is free

**Can't start frontend?**
- Make sure you ran `npm install` first
- Check if port 3000 is free

**No data showing?**
- Create at least 2 users
- Add skills to both
- Endorse each other

---

**Total Setup Time:** 5-10 minutes  
**Ready to Demo:** ✅  

Good luck! 🎉
