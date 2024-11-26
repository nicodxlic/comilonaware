<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

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
     * Perfil de un usuario
     */
    public function getProfile(Request $request)
    {
    return response()->json([
        'user' => $request->user()
    ]);
    }

    /**
     * Editar o actualizar perfil
     */

    public function updateProfile(Request $request)
    {
    $request->validate([
        'name' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255' . $request->user()->id,
        'password' => 'nullable',
    ]);

    $user = $request->user();

    if ($request->has('name')) {
        $user->name = $request->input('name');
    }
    if ($request->has('email')) {
        $user->email = $request->input('email');
    }
    if ($request->has('password')) {
        $user->password = bcrypt($request->input('password'));
    }

    $user->save();

    return response()->json(['message' => 'Perfil actualizado correctamente.', 'user' => $user]);
}

    /**
     * Crear un nuevo usuario
     */
    public function store(Request $request)
    {
            $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
            'role' => 'required|string',
            ]);
            try {
                $user = User::create([
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('password')),
                ]);
                $user->assignRole($request->input('role'));
    
                return response()->json([
                    'success' => true,
                    'message' => 'Usuario creado exitosamente.',
                    'user' => $user,
                ], 201); // Código HTTP 201 para creación exitosa
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al crear el usuario.',
                    'error' => $e->getMessage(),
                ], 500);
        }
    
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
     * Eliminar un usuario.
     */
    public function destroy(string $id)
    {
        try {
            // Prevenir que un usuario elimine su propia cuenta
            if (Auth::id() == $id) {
                return response()->json([
                    'message' => 'No puedes eliminar tu propia cuenta.',
                ], 403);
            }
            $user = User::findOrFail($id);
            $user->delete();
    
            return response()->json([
                'message' => 'Usuario eliminado correctamente.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al intentar eliminar el usuario.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
