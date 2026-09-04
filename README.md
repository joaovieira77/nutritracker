# 🍽️ Nutri Tracker

> A personal health & nutrition tracking app designed to simplify daily tracking and make progress easier to share with a nutritionist.

**Nutri Tracker** is a personal web application I’m building to centralize daily health tracking in one place. It allows users to log **meals, calories and macros, exercise, sleep, water intake, weight and daily notes**, while automatically generating a weekly report that can be exported as a PDF.

The project was born from a real personal need while working with a nutritionist and is being fully designed and developed by me.

> 🚧 **Status:** Work in Progress

---

## ✨ Features

### 🍽️ Meal Tracking

* Log meals by type: breakfast, lunch, snack, dinner and other
* Search a built-in food database
* Automatic calorie and macronutrient calculations
* Daily calorie and macro totals

### 🏃 Exercise

* Track different types of exercise
* Record duration
* Support for multiple activities per day

### 😴 Sleep

* Record bedtime and wake-up time
* Automatic sleep duration calculation

### 💧 Water

* Quick `+1 cup (250ml)` logging
* Custom water amounts
* Daily total

### ⚖️ Weight

* Optional weight tracking
* Visualize weight evolution over time

### 📝 Daily Notes

* Add observations and contextual information to each day

### 📊 Weekly Reports

* Aggregate weekly nutrition and lifestyle data
* Calories and macronutrient averages
* Water, sleep and exercise statistics
* Weight evolution
* Daily notes
* Export reports through the browser's print functionality as PDF

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

There is **no backend, authentication system or external database**. Daily records are persisted locally in the browser using structured JSON objects.

Each day follows the `day:YYYY-MM-DD` storage pattern and contains:

```text
day
├── meals
│   ├── breakfast
│   ├── lunch
│   ├── snack
│   ├── dinner
│   └── other
├── exercises
├── sleep
├── water
├── weight
└── notes
```

This architecture was intentionally chosen for the current use case: a personal, single-device application where the data does not need to leave the user's browser.

---

## 🔐 Privacy

Privacy is an important part of the current architecture.

* No user accounts
* No backend
* No external database
* No third-party data transmission
* Data remains stored locally in the browser
* No cross-device synchronization

The application is therefore currently designed around a **local-first approach**.

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

Then open:

```text
http://localhost:3000
```

### Production

```bash
npm run build
npm run start
```

---

## 🗺️ Roadmap

The project is currently being actively developed. Potential future improvements include:

* [ ] More extensive food database
* [ ] Improved data visualization
* [ ] PWA / offline improvements
* [ ] Data backup and import/export
* [ ] Cloud synchronization
* [ ] User authentication
* [ ] Nutritionist/patient accounts
* [ ] Secure report sharing
* [ ] Backend API and persistent database

---

## 📌 Project Status

Nutri Tracker is a **WIP personal project** and is continuously evolving.

The frontend, application logic and current data architecture are being developed entirely by me.

