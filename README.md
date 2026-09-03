🍽️ Nutri Tracker — Personal Health & Nutrition Tracking App

Nutri Tracker is a personal web application designed to simplify daily health tracking. It helps users log meals, exercise, sleep, water intake and weight in a fast, frictionless way, and consolidates that data into a shareable weekly report — built for tracking progress with a nutritionist.

-Nutri Tracker is currently in development (WIP).
-The project is being fully built by me, covering both frontend and data layer.

🌐 Live Overview

Nutri Tracker is a single-page Next.js application (no backend/server required):
    Frontend: Built with React (App Router) and TypeScript, styled with Tailwind CSS.
    Data layer: Client-side persistence via browser localStorage — no login, no server, single device.

⚙️ Tech Stack

Layer          Technology
Framework      Next.js 14 (App Router)
Language       TypeScript
Styling        Tailwind CSS
Fonts          next/font (Space Grotesk, Inter, JetBrains Mono)
Persistence    Browser localStorage (per-day JSON records)
Charts         Custom lightweight SVG (no external chart library)

🔐 Data & Privacy

Nutri Tracker has no accounts and no backend. All data is:
    Stored locally in the browser via localStorage, under keys like day:YYYY-MM-DD
    Never sent to any server or third party
    Confined to the browser/device where the app is used (no cross-device sync)

🧩 Core Features

🍽️ Meal Logging
    Log food by meal type (breakfast, lunch, snack, dinner, other)
    Search a built-in food database (~70 items, incl. drinks/coffee/dairy)
    Auto-calculated calories and macros (protein, carbs, fat) per entry and per day

🏃 Exercise
    Log type + duration, multiple entries per day

😴 Sleep
    Log bedtime and wake time, with automatic duration calculation

💧 Water
    Quick "+1 cup (250ml)" logging, or custom amount

⚖️ Weight (optional)
    Log periodic weight, view evolution over time on a chart

📝 Daily Notes
    Free-text observations per day, included in the weekly report

📊 Weekly Report
    Aggregated averages/totals: calories, macros, water, sleep, exercise, weight change, notes
    Exportable via browser print → PDF, for sharing with a nutritionist

🗄️ Data Structure

Each day is stored as a single localStorage record (day:YYYY-MM-DD) containing:
    meals — food entries grouped by meal type
    exercises — list of {type, duration}
    sleep — {bed, wake, durationMin} or null
    water — total ml
    weight — kg or null
    notes — free text

🚀 Getting Started

💻 Setup
cd nutri-tracker-next
npm install
npm run dev

Open http://localhost:3000

🏗️ Production build
npm run build
npm run start

Status
-Nutri Tracker is currently in development (WIP).
-The project is being fully built by me, covering both frontend and data architecture.
