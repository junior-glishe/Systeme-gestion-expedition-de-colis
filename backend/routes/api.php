<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

//  AUTH
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Routes protégées
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'profile']);
    });
});



Route::prefix('admin')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);

    // Utilisateurs
    Route::get('/utilisateurs', [AdminController::class, 'getUsers']);
    Route::post('/utilisateurs', [AdminController::class, 'createUser']);
    Route::put('/utilisateurs/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/utilisateurs/{id}', [AdminController::class, 'deleteUser']);

    // Agences
    Route::get('/agences', [AdminController::class, 'getAgences']);
    Route::post('/agences', [AdminController::class, 'createAgence']);
    Route::put('/agences/{id}', [AdminController::class, 'updateAgence']);
    Route::delete('/agences/{id}', [AdminController::class, 'deleteAgence']);

    // Véhicules
    Route::get('/vehicules', [AdminController::class, 'getVehicules']);
    Route::post('/vehicules', [AdminController::class, 'createVehicule']);
    Route::put('/vehicules/{id}', [AdminController::class, 'updateVehicule']);
    Route::delete('/vehicules/{id}', [AdminController::class, 'deleteVehicule']);

    // Tarifs
    Route::get('/tarifs', [AdminController::class, 'getTarifs']);
    Route::post('/tarifs', [AdminController::class, 'createTarif']);
    Route::put('/tarifs/{id}', [AdminController::class, 'updateTarif']);
    Route::delete('/tarifs/{id}', [AdminController::class, 'deleteTarif']);

    // Rapports
    Route::post('/rapports', [AdminController::class, 'genererRapport']);
});