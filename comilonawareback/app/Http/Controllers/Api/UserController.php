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
        $users = User::with('roles', 'permissions')->get();
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
    public function listRolesAndPermissions()
    {
        $roles = Role::all();
        $permissions = Permission::all();

        return response()->json([
            'roles' => $roles,
            'permissions' => $permissions
        ]);
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

    /**
     * Darle rol a un usuario
     */

     public function assignPermission(Request $request, $userId)
    {
        $request->validate([
            'permission' => 'required|string|exists:permissions,name',
        ]);

        $user = User::findOrFail($userId);
        $user->givePermissionTo($request->input('permission'));

        return response()->json(['message' => 'Permiso asignado correctamente.']);
    }

    /**
     * Eliminar permisos de un usuario. Revisar.
     */

    public function removePermission(Request $request, $userId)
    {
        $request->validate([
        'permission' => 'required|string|exists:permissions,name',
        ]);
    
        $user = User::findOrFail($userId);
        $user->revokePermissionTo($request->input('permission'));
    
        return response()->json(['message' => 'Permiso revocado correctamente.']);
    }


}
