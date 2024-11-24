<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $role1 = Role::create(['name' => 'Admin']);
        $role2 = Role::create(['name' => 'Mozo']);
        $role3 = Role::create(['name' => 'Chef']);
        
        /*
        Permission::create(['name' => 'products'])->syncRoles([$role1, $role2]);     //Ver productos
        Permission::create(['name' => '/product/disable/{id}'])->syncRoles([$role1, $role2]);    //Deshabilitar un producto
        Permission::create(['name' => '/product'])->assignRole($role1);     //Crear un producto
        Permission::create(['name' => '/product/{id}'])->syncRoles([$role1, $role2]);    //Mostrar un producto
        Permission::create(['name' => '/product/update/{id}'])->assignRole($role2);     //Actualizar un producto
        Permission::create(['name' => '/product/delete/{id}'])->assignRole($role1);     //Eliminar un producto */
    }
}
