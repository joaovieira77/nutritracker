# 🍽️ Nutri Tracker

> A personal health & nutrition tracking app designed to simplify daily tracking and make progress easier to share with a nutritionist.

**Nutri Tracker** is a personal web application I'm building to centralize daily health tracking in one place. It allows users to log **meals, calories and macros, exercise, sleep, water intake, weight and daily notes**, while automatically generating a weekly report that can be exported as a PDF.

Users can also create **custom foods and recipes**, making the food database extensible without modifying the application code. All data can be backed up and restored locally through JSON files.

The project was born from a real personal need while working with a nutritionist and is being fully designed and developed by me.

> 🚧 **Status:** Work in Progress

---

## ✨ Features

### 🍽️ Meal Tracking

* Log meals by type: breakfast, lunch, snack, dinner and other
* Search a built-in food database of ~90 items, including drinks and dairy
* Search custom foods and recipes alongside the built-in database
* Automatically calculate calories and macronutrients
* Track daily calorie and macro totals

### 🧑‍🍳 Custom Foods

* Create custom foods with name, calories and macronutrients per 100g
* Automatically available through the food search
* Extend the food database without modifying application code
* Persisted locally in the browser

### 🥘 Recipes

* Build recipes by searching for and adding multiple ingredients
* Define ingredient quantities
* Optionally set the final cooked weight of a dish
* Automatically calculate calories and macros based on all ingredients
* Calculate nutritional values per 100g
* Save recipes for future use
* Search and log recipes just like regular foods

### 🏃 Exercise

* Track different types of exercise
* Record exercise duration
* Support multiple activities per day

### 😴 Sleep

* Record bedtime and wake-up time
* Automatically calculate sleep duration

### 💧 Water

* Quick `+1 cup (250ml)` logging
* Add custom water amounts
* Track daily water intake

### ⚖️ Weight

* Optional weight tracking
* Visualize weight evolution over time

### 🩸 Blood Pressure

* Optional blood pressure tracking, with support for multiple readings per day
* Visualize systolic/diastolic evolution over time on a dedicated chart
* Automatic classification based on reference blood pressure ranges (not a substitute for medical advice)
* Weekly average included in the report

### 📝 Daily Notes

* Add observations and contextual information to each day
* Include notes in weekly reports

### 📊 Weekly Reports

* Aggregate weekly nutrition and lifestyle data
* Calculate calorie and macronutrient averages
* Summarize water, sleep and exercise
* Track weight evolution
* Include daily notes
* Export reports through the browser's print functionality as PDF

### 💾 Backup & Restore

* Export all application data as a single JSON file
* Includes daily logs, custom foods and recipes
* Import previously exported backups
* Import is additive, filling missing entries without overwriting existing data
* Provides a simple way to manually transfer or back up data between browsers/devices

---

## 🛠️ Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Framework        | Next.js 14 (App Router) |
| Frontend         | React                   |
| Language         | TypeScript              |
| Styling          | Tailwind CSS            |
| Data Persistence | Browser localStorage    |
| Charts           | Custom SVG              |
| Fonts            | next/font               |

---

## 🏗️ Architecture

Nutri Tracker currently runs entirely on the client side.

There is **no backend, authentication system or external database**. Application data is persisted locally in the browser using structured JSON objects under three main storage patterns:

```text
localStorage
├── day:YYYY-MM-DD
│   ├── meals
│   │   ├── breakfast
│   │   ├── lunch
│   │   ├── snack
│   │   ├── dinner
│   │   └── other
│   ├── exercises
│   ├── sleep
│   ├── water
│   ├── weight
│   └── notes
│
├── customFoods
│
└── recipes
```

### Data Flow

Food and recipe data are used to calculate nutritional values when meals are logged. Daily records are then aggregated to generate weekly statistics and reports.

The current architecture was intentionally chosen for the project's primary use case: a **personal, single-device application** where health data does not need to be transmitted to a server.

---

## 🔐 Privacy

Privacy is an important part of the current architecture.

* No user accounts
* No backend
* No external database
* No third-party data transmission
* Data remains stored locally in the browser
* No automatic cloud synchronization
* Manual JSON backup and restore is available

The application follows a **local-first approach**, keeping personal tracking data on the user's device by default.

---

## 🚀 Getting Started

### Requirements

* Node.js
* npm

### Installation

```bash
git clone <repository-url>
cd nutri-tracker-next
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production

```bash
npm run build
npm run start
```

---

## 🗺️ Roadmap

Potential future improvements include:

* [ ] Integration with a verified food database such as Open Food Facts or USDA FoodData Central
* [ ] Editable meal categories
* [ ] Edit existing custom foods and recipes
* [ ] Improved data visualization
* [ ] PWA / enhanced offline capabilities
* [ ] Cloud synchronization
* [ ] User authentication
* [ ] Nutritionist / patient accounts
* [ ] Secure report sharing
* [ ] Backend API and persistent database

---

## 📌 Project Status

Nutri Tracker is a **WIP personal project** and is continuously evolving.

The frontend, application logic, data architecture and current persistence system are being developed entirely by me.
