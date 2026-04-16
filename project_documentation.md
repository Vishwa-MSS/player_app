# Zenminds Cricketing Solutions: Project Documentation

Welcome to the **Zenminds Player Management Application**! 

This document is written for a developer joining the project. It explains the entire architecture of the application, how the frontend and backend are structured, and how they communicate to form a seamless full-stack system.

---

## 1. High-Level Overview
This project is a complete Full-Stack web application designed to register, view, edit, and delete cricket player statistics. It follows a decoupled architecture, meaning the Frontend User Interface and the Backend Database Server are separated and run independently, communicating over a RESTful API.

- **Frontend:** A Single Page Application (SPA) built with React.
- **Backend:** A RESTful API built with Python and Django.
- **Database:** SQLite3.

---

## 2. Frontend Architecture (React + Vite)
The frontend is the visual face of the application where users interact with the dashboard. It resides in the root directory.

### Key Technologies
- **React (via Vite):** Framework used to build the user interface using reusable components.
- **Tailwind CSS (v3):** A utility-first CSS framework used for styling directly within JS files to create the sleek, "Dark Glassmorphism" aesthetic.

### Core Structure
- **`src/main.jsx`**: The entry point of the React application that renders the DOM.
- **`src/index.css`**: Contains core Tailwind injections (`@tailwind base`, etc.) and basic global elements (like scrollbars). No massive CSS stylesheets exist since styling is inline.
- **`src/App.jsx`**: The main container and "brain" of the frontend. It manages the global application state (like the list of players and the currently active tab) and makes all the HTTP requests to the Backend.
- **`src/components/PlayerForm.jsx`**: The form UI responsible for collecting user input (Age, Score, Name, etc.). It adapts smoothly to become an "Edit" form if passed existing player data.
- **`src/components/PlayerList.jsx`**: A display component that loops through the array of players to render vibrant statistical cards with edit and delete action buttons.

---

## 3. Backend Architecture (Django REST Framework)
The backend is a hidden server whose sole job is to securely manage data permanence. It resides in the `backend/` directory.

### Key Technologies
- **Django:** A high-level Python web framework used as the robust skeleton.
- **Django REST Framework (DRF):** A powerful toolkit built on top of Django to rapidly build Web APIs (translating Python into JSON).
- **SQLite3:** The default lightweight, file-based database for Django.

### Core Structure (`backend/`)
- **`backend/core/`**: The main Django project configuration hub. It contains `settings.py` (which routes CORS rules and registers apps) and the master `urls.py`.
- **`backend/api/`**: The dedicated application managing player logic.
  - **`models.py`**: Defines the `Player` database schema (columns like `name`, `runsScored`, `bowlingType`). This is what creates tables in SQLite.
  - **`serializers.py`**: A mapper that takes complex Python Model data from the database and converts it into pure, readable JSON for the React frontend, and vice-versa.
  - **`views.py`**: Uses DRF's `ModelViewSet`, automatically handling all heavy lifting for CRUD logic (Create, Read, Update, Delete) without needing manual database query code.
  - **`urls.py`**: Automatically generates standard API routes (`/api/players/`) linking to the views.

---

## 4. How They Are Integrated (The Bridge)
Since the frontend and backend are completely separate, they must communicate. This is done through **REST APIs** over HTTP Localhost.

### Cross-Origin Resource Sharing (CORS)
By default, web browsers block a frontend (running on port `5173`) from asking for data from a backend (running on port `8000`) for security. 
To bypass this, the Django backend uses a library called `django-cors-headers`. In `backend/core/settings.py`, we explicitly set `CORS_ALLOW_ALL_ORIGINS = True`, giving React the green light to connect securely.

### The Request Lifecycle
Let's take "Adding a new Player" as an example of how the app flows:
1. **Frontend Input:** The user types data into the React `PlayerForm.jsx` and clicks submit.
2. **The `fetch` Call:** Inside `App.jsx`, a Javascript `fetch()` method packages that data into a JSON string and sends a `POST` HTTP request to `http://127.0.0.1:8000/api/players/`.
3. **Backend Reception:** Django receives the request. The `PlayerSerializer` verifies the data is correct.
4. **Database Save:** DRF safely saves the new data as a row in the `db.sqlite3` database.
5. **Response:** Django replies to React with a successful `201 Created` status code along with the saved player data.
6. **UI Update:** React receives the success message and updates the local state natively, causing the new player to instantly pop up on the dashboard list!

---

## 5. How to Run the Project Locally
To run this application, **two** running terminals are required simultaneously.

### Terminal 1: Run The Backend Database
1. Open a command prompt and navigate to the backend: 
   `cd path/to/Zenminds/Player_app/backend`
2. Start the Django server: 
   `python manage.py runserver`
3. Leave this terminal open. It will listen on `127.0.0.1:8000`.

### Terminal 2: Run The Frontend Application
1. Open a new command prompt at the project root: 
   `cd path/to/Zenminds/Player_app`
2. Start the Vite server: 
   `npm run dev`
3. Leave this terminal open. It will host the UI at `http://localhost:5173`.

> Simply open your browser to `http://localhost:5173` to successfully use the Full-Stack app!
