<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Main Dish', 'deleted' => false],
            ['name' => 'Drink', 'deleted' => false],
            ['name' => 'Side Dish', 'deleted' => false],
            ['name' => 'Dessert', 'deleted' => false],
        ];

        // Insertar las categorías en la base de datos
        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
