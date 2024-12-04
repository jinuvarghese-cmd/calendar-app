<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel Calendar App Documentation</title>
</head>
<body>
    <h1>Laravel Calendar App</h1>
    <p>A Laravel-based application for managing events with a calendar interface.</p>

    <h2>Requirements</h2>
    <ul>
        <li>PHP >= 8.0</li>
        <li>Composer</li>
        <li>Node.js and npm</li>
        <li>MySQL (or another supported database)</li>
        <li>Git (optional, for version control)</li>
    </ul>

    <h2>Installation</h2>
    <p>Follow these steps to set up the project on your local machine:</p>

    <h3>1. Clone the Repository</h3>
    <pre><code>git clone https://github.com/your-username/your-repository.git
cd your-repository
    </code></pre>

    <h3>2. Install PHP Dependencies</h3>
    <pre><code>composer install</code></pre>

    <h3>3. Set Up the Environment File</h3>
    <p>Copy the example <code>.env</code> file and update the configuration as needed:</p>
    <pre><code>cp .env.example to your .env</code></pre>

    </code></pre>

    <h3>4. Run Database Migrations</h3>
    <p>Make sure your database is created, then run:</p>
    <pre><code>php artisan migrate</code></pre>

    <h3>5. Install Node.js Dependencies</h3>
    <pre><code>npm install</code></pre>

    <h3>6. Compile Frontend Assets</h3>
    <p>Compile assets for development:</p>
    <pre><code>npm run dev</code></pre>

    <h3>7. Start the Development Server</h3>
    <pre><code>php artisan serve</code></pre>

    <h2>Usage</h2>
    <ol>
        <li>Open your browser and navigate to:
            <pre><code>http://127.0.0.1:8000</code></pre>
        </li>
        <li>Use the application to create, update, and manage calendar events.</li>
    </ol>
</body>
</html>
