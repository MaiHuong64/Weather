# Weather Forecast Web App

A weather forecast web application with user accounts, saved locations, and an admin analytics dashboard — built with JavaScript, Bootstrap, and Firebase.

## Features

- **Weather Search & Forecast** — search any city and view current conditions plus a 3-day hourly/daily forecast (via WeatherAPI.com), with city autocomplete and input validation
- **Forecast Charts** — visualize hourly/daily forecast data with Chart.js
- **Authentication** — user registration/login with Firebase Authentication; user profile and role stored in Firestore
- **Saved Locations** — logged-in users can save favorite cities and set a default location
- **Search Logging** — each search is logged to Firestore (city, timestamp) for analytics
- **Admin Dashboard** — role-restricted admin area with:
  - Total user count
  - Weekly search volume
  - Top 5 most-searched cities
  - User management and search logs pages
- **Notifications** — in-app notification component for logged-in users

## Tech Stack

- **Frontend**: HTML, CSS, Bootstrap 5, vanilla JavaScript (ES Modules)
- **Backend-as-a-Service**: Firebase Authentication, Firebase Firestore
- **Hosting**: Firebase Hosting
- **External API**: [WeatherAPI.com](https://www.weatherapi.com/) for forecast data
- **Charts**: Chart.js

## Project Structure

```
Weather/
  ├── css/               # Stylesheets
  ├── js/
  │   ├── config.js          # Firebase initialization
  │   ├── auth.js            # Login-state UI handling
  │   ├── main.js             # Register / login / logout logic
  │   ├── search.js          # Weather search & API call
  │   ├── weatherDisplay.js  # Renders current weather
  │   ├── forecast.js        # Hourly/daily forecast rendering
  │   ├── chart.js           # Forecast chart rendering
  │   ├── location.js        # Save/get saved locations
  │   ├── defaultlocation.js # Manage default location
  │   ├── writeLog.js        # Logs searches to Firestore
  │   ├── admin.js           # Admin dashboard analytics
  │   ├── users.js           # Admin: user list
  │   └── logs.js            # Admin: search logs list
  ├── public/            # Firebase Hosting public assets
  ├── index.html          # Home / search page
  ├── login.html / register.html
  ├── location.html      # Saved locations page
  ├── admin.html / users.html / logs.html   # Admin pages
  └── firebase.json      # Firebase Hosting config
```

## Access Control

User roles (`user` / `admin`) are stored per-account in Firestore and enforced with **Firestore Security Rules**, so access to admin data is restricted at the database level, not just hidden in the UI.

## Getting Started

1. Clone the repo and open `index.html` with a local server (e.g. VS Code Live Server), or deploy with Firebase Hosting:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy
   ```
2. Add your own Firebase project config in `js/config.js` and a WeatherAPI.com key in `js/search.js`.
