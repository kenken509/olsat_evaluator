<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversionTableController;
use App\Http\Controllers\EvaluatorController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\UsersController;
use App\Models\RawScaledLevel;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Route;
use Termwind\Components\Raw;

Route::get('/', function () {
    return inertia('Index');
});


Route::controller(EvaluatorController::class)->group(function () {
    Route::get('/evaluator', 'index');

    Route::post('/evaluator/evaluate', 'evaluate');
});

Route::controller(ConversionTableController::class)->group(function () {
    Route::get('/conversion-table', 'index');
    Route::get('/conversion-table-data', 'getData');
});

Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'index')->name('login');
    Route::post('/login', 'store');
    Route::get('/logout', 'destroy');
});

Route::middleware(['auth', 'admin'])->controller(AdminDashboardController::class)->group(function () {
    Route::get('/admin-panel/dashboard', 'index');
});

Route::middleware(['auth', 'admin'])->controller(UsersController::class)->group(function () {
    Route::get('/admin-panel/users', 'index');
});

Route::middleware(['auth', 'admin'])->controller(StudentsController::class)->group(function () {
    Route::get('/admin-panel/students', 'index');
});

Route::middleware(['auth', 'admin'])->controller(UsersController::class)->group(function () {
    Route::get('/admin-panel/users-all', 'allUsers');
    Route::delete('/admin-panel/users/{user}', 'destroy');
    Route::patch('/admin-panel/users/{id}/restore', 'restore');
});
