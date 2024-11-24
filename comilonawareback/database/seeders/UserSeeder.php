<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Crea un administrador
        $admin = User::create([
            'name' => 'Usuario admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('adm123'),
        ]);
        $admin->assignRole('Admin');

        // Crea un mozo
        $waiter = User::create([
            'name' => 'Usuario mozo',
            'email' => 'mozo@mozo.com',
            'password' => bcrypt('mozo123'),
        ]);
        $waiter->assignRole('Mozo');

        // Crea un chef
        $chef = User::create([
            'name' => 'Usuario chef',
            'email' => 'chef@chef.com',
            'password' => bcrypt('chef123'),
        ]);
        $chef->assignRole('Chef');
    }
}
