# CreatorSetu

### Connecting brands with the right creators — without the guesswork.

CreatorSetu is a full-stack creator collaboration platform built to make influencer discovery and brand-creator partnerships simpler.

Instead of searching through scattered social profiles, brands can discover creators by niche, location, and audience, explore their profiles, and initiate collaboration from one place.

The project started as an idea around a simple problem:

> Finding a creator is easy. Finding the right creator for a campaign is not.

CreatorSetu is my attempt to solve that problem through a focused, marketplace-style web application.

---

## ✨ What CreatorSetu Does

CreatorSetu brings the core parts of a creator marketplace into one platform.

### 🔎 Discover Creators

Brands can explore creators across categories such as:

- Gaming
- Fashion
- Technology
- Food
- Fitness
- Travel

Creators can also be searched using:

- Name
- Category
- Location

### 👤 Creator Profiles

Each creator has a dedicated profile containing relevant information such as:

- Creator niche
- Location
- Audience size
- Ratings
- Verification status
- Profile information

This gives brands enough context to evaluate a creator before starting a collaboration.

### 🤝 Collaboration

The platform provides a workflow for brands and creators to connect and manage collaboration requests.

### 🔐 Authentication

CreatorSetu includes authentication and protected application routes so that user-specific functionality is separated from public pages.

### 🔔 Notifications

A notification system keeps users informed about important collaboration-related activities.

---

## 🖥️ Product Experience

The application is designed around a simple flow:

```text
Discover
   ↓
Search / Filter
   ↓
Explore Creator
   ↓
View Profile
   ↓
Start Collaboration
   ↓
Manage Requests

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- React Router
- Tailwind CSS
- Vite
- Lucide React

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- REST APIs

### Database
- SQLite

### Tools
- Git
- GitHub
- VS Code

---

## 🏗️ Project Architecture

CreatorSetu follows a separated frontend and backend architecture.

```text
CreatorSetu
│
├── Frontend
│   └── React.js
│       ├── Components
│       ├── Pages
│       ├── Routing
│       └── Authentication State
│
├── Backend
│   └── Flask
│       ├── REST APIs
│       ├── Routes
│       ├── Models
│       └── Services
│
└── Database
    └── SQLite


    CreatorSetu/
│
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.py
│   ├── config.py
│   ├── extensions.py
│   └── requirements.txt
│
├── Frontend/
│   └── app/
│       ├── public/
│       └── src/
│           ├── assets/
│           ├── components/
│           ├── context/
│           ├── pages/
│           ├── routes/
│           └── services/
│
├── Database/
├── Design/
├── Docs/
├── .gitignore
└── Readme.md

---

## 📸 Product Screenshots

A quick look at CreatorSetu in action.

### 🏠 Landing Page

The main entry point where brands can understand the platform and start discovering creators.

![CreatorSetu Landing Page](Design/screenshots/Landingpage.png)

### 🔎 Discover Creators

The discovery experience lets brands search and explore creators by niche, location, and audience.

![Creator Discovery](Design/screenshots/discover.png)

### ⭐ Featured Creators

A curated view of creators with their niche, audience size, ratings, location, and verification status.

![Featured Creators](Design/screenshots/featured-creators.png)

### 🧭 Categories & How It Works

Creators can be explored through categories, while the platform flow keeps discovery, connection, and launch simple.

![Categories and How It Works](Design/screenshots/categories-how-it-works.png)

### 🚀 Campaign Experience

The campaign experience focuses on helping brands identify the right creator match and move towards collaboration.

![Campaign Experience](Design/screenshots/campaign-cta.png)