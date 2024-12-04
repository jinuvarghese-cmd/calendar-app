<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

Route::get('/', [EventController::class, 'index']);



// Route::get('/', function () {
//     return view('welcome');
// });
