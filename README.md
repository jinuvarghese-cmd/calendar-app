# Laravel Calendar App

A Laravel-based application for managing events with a calendar interface.

---

## Requirements

Before you begin, make sure your system meets the following requirements:

- PHP >= 8.0
- Composer
- Node.js and npm
- MySQL (or another supported database)
- Git (optional, for version control)

---

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/jinuvarghese-cmd/calendar-app.git
cd your-repository
```

### 2. Install PHP Dependencies
Run the following command to install backend dependencies:
```bash
composer install
```

### 3. Set Up the Environment File
Copy the example `.env` file and update the configuration as needed:
```bash
cp .env.example .env
```
  
### 4. Run Database Migrations
Make sure your database is created, then run:
```bash
php artisan migrate
```

### 5. Install Node.js Dependencies
Run the following command to install frontend dependencies:
```bash
npm install
```

### 6. Compile Frontend Assets
Compile assets for development:
```bash
npm run dev
```

### 7. Start the Development Server
Start the Laravel development server:
```bash
php artisan serve
```

---

## Usage

1. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000
   ```

2. Use the application to create, update, and manage calendar events.

---