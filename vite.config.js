import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 'resources/js/app.js',
                'node_modules/@fullcalendar/core/main.css',
                'node_modules/@fullcalendar/daygrid/main.css',
                'node_modules/@fullcalendar/timegrid/main.css',
            ],
            refresh: true,
        }),
    ],
});
