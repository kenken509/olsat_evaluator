<?php

use App\Http\Controllers\EvaluatorController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Index');
});


Route::controller(EvaluatorController::class)->group(function () {
    Route::get('/evaluator', 'index');
});