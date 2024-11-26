<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('apiToken')->plainTextToken;
            if ($user->hasRole('Admin')){
                $role = "Admin";
            } elseif ($user->hasRole('Chef')){
                $role = "Chef";
            } elseif ($user->hasRole('Mozo')){
                $role = "Mozo";
            }

            return response()->json([
                'user' => $user,
                'access_token' => $token,
                'role' => $role,
            ]);
        }
        return response()->json(['error' => 'Credenciales incorrectas'], 401);
    }

    /**
     * Para el logout se usó de referencia el método destroy
     * dentro de AuthenticatedSessionController
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout(); 

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['message' => 'Sesión cerrada exitosamente'], 200);
    }
}
