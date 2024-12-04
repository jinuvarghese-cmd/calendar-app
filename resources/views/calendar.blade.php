<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel Calendar</title>
    @vite(['resources/js/app.js', 'resources/css/app.css'])
</head>
<body>
    <div id="calendar"></div>

    <div id="event-modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
        <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
            <div class="px-4 py-3 border-b border-gray-300 flex justify-between items-center">
                <h3 id="modal-title" class="text-lg font-semibold"></h3>
                <button class=" close-modal text-gray-500 hover:text-gray-700 focus:outline-none text-xl">
                    &times;
                </button>
            </div>
            <div class="p-4">   
                <form id="event-form" class="space-y-4">
                    <input type="hidden" id="event-id">
                    <div>
                        <label for="event-title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="event-title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
                    </div>
                    <div>
                        <label for="event-start" class="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="datetime-local" id="event-start" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
                    </div>
                    <div>
                        <label for="event-end" class="block text-sm font-medium text-gray-700">End Date</label>
                        <input type="datetime-local" id="event-end" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="event-description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="event-description" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                    </div>
                </form>
            </div>
            <div class="px-4 py-3 border-t border-gray-300 flex justify-end space-x-4">
                <button id="delete-event" class="hidden bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none">Delete</button>
                <button type="button" class=" close-modal bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none">Cancel</button>
                <button type="submit" form="event-form" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none">Save</button>
            </div>
        </div>
    </div>
</body>
</html>
