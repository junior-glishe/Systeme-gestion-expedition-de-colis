<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //  INSCRIPTION (Demande de compte)
    public function register(Request $request)
    {
        // 1. Validation
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'mot_de_passe' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. Création avec rôle ADMIN par défaut
        $user = User::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => $request->mot_de_passe,
            'role' => 'ADMIN',  //  PAR DÉFAUT
            'actif' => false,   //  En attente de validation
        ]);

        // 3. Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Compte créé avec succès. En attente de validation par  l\'administrateur.',
            'user' => [
                'id' => $user->id_user,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->role,
                'actif' => $user->actif,
            ],
            'token' => $token
        ], 201);
    }

    //  CONNEXION
    public function login(Request $request)
    {
        // 1. Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'mot_de_passe' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. Recherche de l'utilisateur
        $user = User::where('email', $request->email)->first();

        // 3. Vérification des identifiants
        if (!$user || !Hash::check($request->mot_de_passe, $user->mot_de_passe)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        // 4. Vérification si le compte est actif
        if (!$user->actif) {
            return response()->json([
                'message' => 'Votre compte est en attente de validation par un administrateur.'
            ], 403);
        }

        // 5. Suppression des anciens tokens
        $user->tokens()->delete();

        // 6. Création du nouveau token
        $token = $user->createToken('auth_token')->plainTextToken;

        // 7. Réponse avec le rôle
        return response()->json([
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id_user,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->role,  //  POUR LA REDIRECTION
                'actif' => $user->actif,
            ],
            'token' => $token,
            // 👇 Redirection suggérée (optionnel)
            'dashboard' => $this->getDashboardUrl($user->role)
        ], 200);
    }

  

    //  DÉCONNEXION
    public function logout(Request $request)
    {
        // Supprime le token actuel
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie. Redirigé vers la page de connexion.',
            'redirect_to' => '/login'  //  Indique à React où rediriger
        ], 200);
    }

    //  PROFIL
    public function profile(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ], 200);
    }

    //  URL de redirection selon le rôle
    private function getDashboardUrl($role)
    {
        return match ($role) {
            'ADMIN' => '/admin/dashboard',
            'AGENT' => '/agent/dashboard',
            'CHAUFFEUR' => '/chauffeur/dashboard',
            default => '/login',
        };
    }
}