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
            'name' => "Ravioles con salsa de champiñones",
            'price' => 8700,
            'image' => "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAFdX3RKFH9SlSxE-CFLbcFB-LmKtr-RlicCMjh1D331UIN9zaYpUAhL27o5jXV2-bSule1GwyRaO0iHCOC4dP-crKQBONvlTFB40EKx8kKbVo2zDD1XsE8aBxtBs3YOdlrg_QZO5CgqI/s1600/raviolis+con+salsa+de+champi%C3%B1ones.jpg"
        ]);

        Product::factory()->create([
            'name' => "Coca-cola 355 ml",
            'price' => 1600,
            'image' => "Imagen"
        ]);
    }
}
