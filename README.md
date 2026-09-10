🍽️ Nutri Tracker

    A personal health & nutrition tracking app designed to simplify daily tracking and make progress easier to share with a nutritionist.

Nutri Tracker is a personal web application I'm building to centralize daily health tracking in one place. It allows users to log meals, calories and macros, exercise, sleep, water intake, weight and daily notes, while automatically generating a weekly report that can be exported as a PDF. Users can also create their own custom foods and recipes, and back up all their data locally.

The project was born from a real personal need while working with a nutritionist and is being fully designed and developed by me.

    🚧 Status: Work in Progress

✨ Features
🍽️ Meal Tracking

    Log meals by type: breakfast, lunch, snack, dinner and other
    Search a built-in food database (~90 items, including drinks and dairy)
    Automatic calorie and macronutrient calculations
    Daily calorie and macro totals

🧑‍🍳 Custom Foods

    Create custom foods on the fly (name + calories/macros per 100g)
    Available directly from the food search, alongside the built-in database
    Persisted locally, no need to edit code to extend the database

🥘 Recipes

    Build multi-ingredient recipes by searching and adding foods with quantities
    Optionally set the dish's final cooked weight for accurate post-cooking macros
    Macros per 100g are calculated automatically from all ingredients
    Recipes become searchable and can be logged to a meal just like any other food

🏃 Exercise

    Track different types of exercise
    Record duration
    Support for multiple activities per day

😴 Sleep

    Record bedtime and wake-up time
    Automatic sleep duration calculation

💧 Water

    Quick +1 cup (250ml) logging
    Custom water amounts
    Daily total

⚖️ Weight

    Optional weight tracking
    Visualize weight evolution over time

📝 Daily Notes

    Add observations and contextual information to each day

📊 Weekly Reports

    Aggregate weekly nutrition and lifestyle data
    Calories and macronutrient averages
    Water, sleep and exercise statistics
    Weight evolution
    Daily notes
    Export reports through the browser's print functionality as PDF

💾 Backup & Restore

    Export all data (daily logs, custom foods, recipes) as a single JSON file
    Import a backup file to restore or merge data into the current browser
    Import is additive — it fills in missing entries without overwriting existing data

🛠️ Tech Stack
Layer 	Technology
Framework 	Next.js 14 (App Router)
Frontend 	React
Language 	TypeScript
Styling 	Tailwind CSS
Data Persistence 	Browser localStorage
Charts 	Custom SVG
Fonts 	next/font
🏗️ Architecture

Nutri Tracker currently runs entirely on the client side.

There is no backend, authentication system or external database. Records are persisted locally in the browser using structured JSON objects, under three key patterns:

localStorage
├── day:YYYY-MM-DD       (one entry per day)
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
├── customFoods            (array of user-created foods)
└── recipes                  (array of user-created recipes)

This architecture was intentionally chosen for the current use case: a personal, single-device application where the data does not need to leave the user's browser.
🔐 Privacy

Privacy is an important part of the current architecture.

    No user accounts
    No backend
    No external database
    No third-party data transmission
    Data remains stored locally in the browser
    No cross-device synchronization (backup/restore via manual JSON export is available)

The application is therefore currently designed around a local-first approach.
🚀 Getting Started
Requirements

    Node.js
    npm

Installation

git clone <repository-url>
cd nutri-tracker-next
npm install

Development

npm run dev

Then open:

http://localhost:3000

Production

npm run build
npm run start

🗺️ Roadmap

The project is currently being actively developed. Potential future improvements include:

    Integration with a real, verified food database (Open Food Facts / USDA FoodData Central)
    Editable meal categories
    Editing existing custom foods and recipes (currently create/delete only)
    Improved data visualization
    PWA / offline improvements
    Cloud synchronization
    User authentication
    Nutritionist/patient accounts
    Secure report sharing
    Backend API and persistent database

📌 Project Status

Nutri Tracker is a WIP personal project and is continuously evolving.

The frontend, application logic and current data architecture are being developed entirely by me.
