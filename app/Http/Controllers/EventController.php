<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Carbon\Carbon;

class EventController extends Controller
{
    public function index()
    {
        return view('calendar'); // Frontend view
    }

    public function fetchEvents()
    {
        $events = Event::all()->map(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'start' => Carbon::parse($event->start_date)->format('Y-m-d H:i:s'),
                'end' => $event->end_date ? Carbon::parse($event->end_date)->format('Y-m-d H:i:s') : null,
                'description' => $event->description,
            ];
        });

        return response()->json($events);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $event = Event::create([
            'title' => $validated['title'],
            'start_date' => Carbon::parse($validated['start_date'])->format('Y-m-d H:i:s'),
            'end_date' => $validated['end_date'] ? Carbon::parse($validated['end_date'])->format('Y-m-d H:i:s') : null,
            'description' => $validated['description'],
        ]);

        return response()->json($event, 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $event = Event::findOrFail($id);
        $event->update([
            'title' => $validated['title'],
            'start_date' => Carbon::parse($validated['start_date'])->format('Y-m-d H:i:s'),
            'end_date' => $validated['end_date'] ? Carbon::parse($validated['end_date'])->format('Y-m-d H:i:s') : null,
            'description' => $validated['description'],
        ]);

        return response()->json($event, 200);
    }

    public function destroy($id)
    {
        Event::destroy($id);
        return response()->json(null, 204);
    }
}
