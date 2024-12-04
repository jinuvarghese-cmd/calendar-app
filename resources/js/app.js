import './bootstrap';
import { Calendar,formatDate} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { DateTime } from 'luxon';

function generateSignature(payload, timestamp) {
    const apiSecretKey = 'your_random_secure_key'; 
    const dataToSign = (payload === '' ? '' : JSON.stringify(payload)) + timestamp;
    return CryptoJS.HmacSHA256(dataToSign, apiSecretKey).toString(CryptoJS.enc.Hex);
}


document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('modal-title');
    const eventForm = document.getElementById('event-form');
    const eventIdInput = document.getElementById('event-id');
    const eventTitleInput = document.getElementById('event-title');
    const eventStartInput = document.getElementById('event-start');
    const eventEndInput = document.getElementById('event-end');
    const eventDescriptionInput = document.getElementById('event-description');
    const deleteButton = document.getElementById('delete-event');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    let calendarEl = document.getElementById('calendar');

    let calendar = new Calendar(calendarEl, {
        plugins: [
            dayGridPlugin, 
            timeGridPlugin, 
            interactionPlugin, 
            listPlugin, 
            multiMonthPlugin
        ],
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: '/api/events', // Fetch events from backend
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,multiMonthYear,timeGridWeek,timeGridDay,listWeek'
        },
        timeZone: 'local',
        select: function (info) {
            openModal('Add Event', {
                start: info.startStr,
                end: info.endStr,
            });
        },
        eventClick: function (info) {
            openModal('Edit Event', {
                id: info.event.id,
                title: info.event.title,
                start: info.event.start.toISOString(),
                end: info.event.end ? info.event.end.toISOString() : null,
                description: info.event.extendedProps.description || '',
            });
        },
    });

    calendar.render();

    function openModal(action, event = {}) {
        const modal = document.getElementById('event-modal');
        modal.classList.remove('hidden'); // Show modal
        modalTitle.textContent = action;
        eventForm.reset();
        eventIdInput.value = event.id || '';
        eventTitleInput.value = event.title || '';
        eventStartInput.value = event.start ? formatDateForInput(event.start) : '';
        eventEndInput.value = event.end ? formatDateForInput(event.end) : '';
        eventDescriptionInput.value = event.description || '';
        deleteButton.style.display = event.id ? 'inline-block' : 'none';
    }
    
    function closeModal() {
        const modal = document.getElementById('event-modal');
        modal.classList.add('hidden'); // Hide modal
    }
    
    eventForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = eventIdInput.value;
        const title = eventTitleInput.value;
        const start = eventStartInput.value;
        const end = eventEndInput.value || null;
        const description = eventDescriptionInput.value;

        if (id) {
            updateEvent(id, title, start, end, description);
        } else {
            createEvent(title, start, end, description);
        }
    });

    deleteButton.addEventListener('click', function () {
        const id = eventIdInput.value;
        confirmDeleteEvent(id);
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    function createEvent(title, start, end, description) {
        const payload = { title, start_date: start, end_date: end, description };
        const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
        const signature = generateSignature(payload, timestamp);

        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Timestamp': timestamp,
                'X-Signature': signature,
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message || 'Failed to create event.');
                    });
                }
                calendar.refetchEvents();
                closeModal();
                Swal.fire('Success', 'Event added successfully!', 'success');
            })
            .catch((error) => Swal.fire('Error', error.message, 'error'));
    }

    function updateEvent(id, title, start, end, description) {
        const payload = { title, start_date: start, end_date: end, description };
        const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
        const signature = generateSignature(payload, timestamp);

        fetch(`/api/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Timestamp': timestamp,
                'X-Signature': signature
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message || 'Failed to update event.');
                    });
                }
                calendar.refetchEvents();
                closeModal();
                Swal.fire('Success', 'Event updated successfully!', 'success');
            })
            .catch((error) => Swal.fire('Error', error.message, 'error'));
    }

    function confirmDeleteEvent(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEvent(id);
            }
        });
    }

    function deleteEvent(id) {
        const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
        const signature = generateSignature('', timestamp); // Use an empty string as payload
        
        fetch(`/api/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Timestamp': timestamp,
                'X-Signature': signature
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete event.');
                }
                calendar.refetchEvents();
                closeModal();
                Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
            })
            .catch((error) => Swal.fire('Error', error.message, 'error'));
    }

    function formatDateForInput(date) {
        const parsedDate = DateTime.fromISO(date).toLocal(); // Convert to local timezone
        if (!parsedDate.isValid) {
            console.error("Invalid date format:", date);
            return null; // Handle invalid date input
        }
    
        // Format to local date and time
        return parsedDate.toFormat("yyyy-MM-dd'T'HH:mm");
    }
    
});
