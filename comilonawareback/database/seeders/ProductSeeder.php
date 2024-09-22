<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()->create([
            'name' => "Nombre de prueba",
            'price' => 30,
            'image' => "Imagen de prueba XD",
            'stock' => 5,
        ]);
    }
}
