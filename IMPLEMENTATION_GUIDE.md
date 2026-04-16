# Zenminds Cricket App - Step-by-Step Implementation Guide

## Prerequisites

Before you begin, make sure you have the following installed:
- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn
- pip (Python package manager)

## Step 1: Setup Backend (Django)

### 1.1 Navigate to Backend Directory
```bash
cd backend
```

### 1.2 Create Python Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 1.3 Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 1.4 Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 1.5 Create Superuser (Admin Account)
```bash
python manage.py createsuperuser
```
Follow the prompts to create an admin account. You'll use this to access the Django admin panel at `http://127.0.0.1:8000/admin/`

### 1.6 Start Django Development Server
```bash
python manage.py runserver
```

The backend should now be running at `http://127.0.0.1:8000/`

**Keep this terminal open!** The server needs to stay running.

---

## Step 2: Setup Frontend (React)

### 2.1 Open New Terminal and Navigate to Frontend Directory
```bash
cd frontend
```

### 2.2 Install Node Dependencies
```bash
npm install
```

This will install all the required packages including React, React Router, Axios, and Tailwind CSS.

### 2.3 Start React Development Server
```bash
npm start
```

The frontend should automatically open in your browser at `http://localhost:3000/`

**Keep this terminal open too!** The React server needs to stay running.

---

## Step 3: Using the Application

### 3.1 Create Your Account
1. Open your browser to `http://localhost:3000/`
2. You'll be redirected to the Login page
3. Click "Sign up" at the bottom
4. Fill in the signup form:
   - Username (required)
   - Email (required)
   - First Name (optional)
   - Last Name (optional)
   - Password (required)
   - Confirm Password (required)
5. Click "Sign Up"
6. You'll be redirected to the login page

### 3.2 Login
1. Enter your username and password
2. Click "Login"
3. You'll be taken to the Dashboard

### 3.3 Add Your First Player
1. Click the "Add Player" button in the navigation
2. Fill in the player profile form:
   - **Player Profile**: Full name, nationality, jersey number, age, height, weight
   - **Technical Skills**: Select primary skill (Batsman/Bowler/All Rounder), batting style, bowling type
   - **Statistics**: Runs scored, average, strike rate, wickets, economy
3. Click "Register Player"
4. You'll be redirected to the Dashboard showing your player

### 3.4 View Players
- The Dashboard tab shows all your registered players
- Each player card displays their complete profile
- If no players exist, you'll see a helpful message

### 3.5 Edit a Player
1. Click the "Edit" button on any player card
2. The form will populate with the player's current data
3. Make your changes
4. Click "Update Player"

### 3.6 Delete a Player
1. Click the "Delete" button on any player card
2. Confirm the deletion in the popup
3. The player will be removed

### 3.7 Logout
- Click the "Logout" button in the header
- You'll be returned to the login page

---

## Step 4: Understanding Single Device Login

### How It Works
- When you login, a session is created
- If you try to login from another device/browser with the same account, the previous session will be invalidated
- Only one active session per user is allowed at a time
- This prevents account sharing and enhances security

### Testing Single Device Login
1. Login on Chrome
2. Try to login with the same credentials on Firefox or an Incognito window
3. The first session (Chrome) will be logged out automatically

---

## Step 5: Understanding User Data Isolation

### How It Works
- Each player profile is linked to the user who created it
- You can only see, edit, and delete YOUR OWN players
- Other users cannot see or modify your players
- This is enforced at the API level for security

### Testing Data Isolation
1. Create a second user account
2. Login with the second account
3. Notice that the Dashboard is empty
4. Any players you create will only be visible to this account

---

## Step 6: Admin Panel (Optional)

### Access Admin Panel
1. Visit `http://127.0.0.1:8000/admin/`
2. Login with the superuser account you created earlier
3. Here you can:
   - View all users
   - View all players (from all users)
   - View active sessions
   - Manually manage data

---

## Step 7: Stopping the Application

### Stop Frontend
- In the terminal running React, press `Ctrl + C`

### Stop Backend
- In the terminal running Django, press `Ctrl + C`

### Deactivate Virtual Environment
```bash
deactivate
```

---

## Step 8: Restarting the Application

### Restart Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python manage.py runserver
```

### Restart Frontend
```bash
cd frontend
npm start
```

---

## Troubleshooting

### Problem: CORS Errors
**Solution**: Make sure both servers are running and the URLs in `settings.py` and `api.js` match.

### Problem: "Could not connect to backend server" Error
**Solution**: 
1. Check that Django is running on port 8000
2. Check that there are no firewall issues
3. Verify the API_BASE_URL in `frontend/src/services/api.js`

### Problem: CSRF Token Issues
**Solution**: Clear your browser cookies and try again.

### Problem: Port Already in Use
**Solution**: 
- For backend: Use `python manage.py runserver 8001` (different port)
- For frontend: When prompted, type `Y` to use a different port

### Problem: Database Locked
**Solution**: 
1. Stop all Django processes
2. Delete `db.sqlite3`
3. Run migrations again

### Problem: Module Not Found
**Solution**: 
- Backend: Make sure virtual environment is activated and run `pip install -r requirements.txt` again
- Frontend: Delete `node_modules` folder and run `npm install` again

---

## API Endpoints Reference

### Authentication Endpoints
- `POST /api/auth/signup/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `GET /api/auth/user/` - Get current user details
- `GET /api/auth/csrf/` - Get CSRF token

### Player Endpoints
- `GET /api/players/` - List all players (current user only)
- `POST /api/players/` - Create new player
- `GET /api/players/{id}/` - Get specific player
- `PUT /api/players/{id}/` - Update player
- `DELETE /api/players/{id}/` - Delete player

---

## Project Structure Summary

```
zenminds-cricket-app/
├── backend/                    # Django backend
│   ├── config/                 # Project settings
│   ├── accounts/              # Authentication app
│   ├── players/               # Players app
│   ├── manage.py              # Django CLI
│   └── requirements.txt       # Python dependencies
│
└── frontend/                  # React frontend
    ├── src/
    │   ├── components/        # React components
    │   ├── services/         # API services
    │   ├── context/          # React context
    │   └── App.jsx           # Main app
    ├── package.json          # Node dependencies
    └── tailwind.config.js    # Tailwind config
```

---

## Features Implemented

✅ **Authentication**
- User signup with validation
- Login with session authentication
- Single device login enforcement
- Secure logout

✅ **Player Management**
- Create player profiles
- View all your players
- Edit player information
- Delete players
- User data isolation

✅ **UI/UX**
- Dark theme matching provided designs
- Responsive layout
- Error handling with banners
- Loading states
- Form validations

✅ **Security**
- CSRF protection
- Session-based authentication
- Single device login
- User-specific data access
- Secure password storage

---

## Next Steps for Deployment

When you're ready to deploy to production:

1. **Backend Deployment**
   - Change `DEBUG = False` in settings.py
   - Use PostgreSQL instead of SQLite
   - Set up environment variables for secrets
   - Configure ALLOWED_HOSTS
   - Set up static file serving

2. **Frontend Deployment**
   - Build production bundle: `npm run build`
   - Update API_BASE_URL to production backend URL
   - Deploy to hosting service (Vercel, Netlify, etc.)

3. **Security Enhancements**
   - Use HTTPS
   - Set secure cookie flags
   - Implement rate limiting
   - Add email verification
   - Set up proper CORS policies

---

## Support

If you encounter any issues:
1. Check the console for error messages
2. Review the troubleshooting section
3. Check that both servers are running
4. Verify your database migrations are up to date

Happy coding! 🏏
