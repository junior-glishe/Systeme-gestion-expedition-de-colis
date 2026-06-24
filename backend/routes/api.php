<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChauffeurController;
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


//  AGENT
Route::prefix('agent')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/clients', [AgentController::class, 'getClients']);
    Route::post('/clients', [AgentController::class, 'createClient']);
    Route::put('/clients/{id}', [AgentController::class, 'updateClient']);
    Route::delete('/clients/{id}', [AgentController::class, 'deleteClient']);

    Route::get('/colis', [AgentController::class, 'getColis']);
    Route::post('/colis', [AgentController::class, 'createColis']);
    Route::put('/colis/{id}', [AgentController::class, 'updateColis']);
    Route::delete('/colis/{id}', [AgentController::class, 'deleteColis']);

    Route::get('/expeditions', [AgentController::class, 'getExpeditions']);
    Route::post('/expeditions', [AgentController::class, 'createExpedition']);
    Route::put('/expeditions/{id}', [AgentController::class, 'updateExpedition']);
    Route::delete('/expeditions/{id}', [AgentController::class, 'deleteExpedition']);

    Route::post('/paiements', [AgentController::class, 'createPaiement']);
    Route::get('/recherche', [AgentController::class, 'searchColis']);
    Route::get('/historique', [AgentController::class, 'getHistorique']);
});

//  CHAUFFEUR
Route::prefix('chauffeur')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/colis-affectes', [ChauffeurController::class, 'getColisAffectes']);
    Route::put('/colis/{id}/statut', [ChauffeurController::class, 'marquerStatut']);
    Route::get('/trajets', [ChauffeurController::class, 'getMesTrajets']);
    Route::post('/incidents', [ChauffeurController::class, 'signalerIncident']);
});