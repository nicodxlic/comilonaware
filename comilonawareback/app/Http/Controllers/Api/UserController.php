<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Lista de usuarios con roles y permisos.
     */
    public function index()
    {
        $users = User::with('roles')->get();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    /**
     * Listado de roles y permisos disponibles.
     */
    public function listRoles()
    {
        $roles = Role::all();
        return $roles;
    }

    /**
     * Asignar un rol a un usuario.
     */
        public function assignRole(Request $request, $userId)
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        $user = User::findOrFail($userId);
        $user->assignRole($request->input('role'));

        return response()->json(['message' => 'Rol asignado correctamente.']);
    }

    /**
     * Quitarle el rol a un usuario
     */
    public function removeRole(Request $request, $userId)
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        $user = User::findOrFail($userId);
        $user->removeRole($request->input('role'));

        return response()->json(['message' => 'Rol revocado correctamente.']);
    }

    public function changeRole(Request $request, $id)
    {

        $user = User::findOrFail($id);
        $newRole = $request->input('role');

        // Eliminar todos los roles actuales del usuario
        $user->syncRoles([]);
        $user->assignRole($newRole);

        return response()->json([
            'message' => 'Rol cambiado con éxito',
            'user' => $user->load('roles') // Devuelve el usuario con sus roles actualizados
        ], 200);
    }
}
