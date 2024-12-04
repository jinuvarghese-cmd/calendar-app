<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Middleware\VerifySignature;

Route::get('/events', [EventController::class, 'fetchEvents']);
Route::middleware([VerifySignature::class])->group(function () {
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);
});
