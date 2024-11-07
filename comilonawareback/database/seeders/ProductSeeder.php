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
            'image' => "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAFdX3RKFH9SlSxE-CFLbcFB-LmKtr-RlicCMjh1D331UIN9zaYpUAhL27o5jXV2-bSule1GwyRaO0iHCOC4dP-crKQBONvlTFB40EKx8kKbVo2zDD1XsE8aBxtBs3YOdlrg_QZO5CgqI/s1600/raviolis+con+salsa+de+champi%C3%B1ones.jpg",
            'category_id' => 1
        ]); 
        
        Product::factory()->create([
            'name' => "Hamburguesa con queso",
            'price' => 7900,
            'image' => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqIvY_EddgWVLKNZD3S-xTjijRkfogKFxFkA&s",
            'category_id' => 1
        ]); 
        
        Product::factory()->create([
            'name' => "Coca cola 500ml",
            'price' => 2500,
            'image' => "https://puntodesalud.com.ar/25922-large_default/coca-cola-original-500-ml.jpg",
            'category_id' => 2
        ]); 
        
        Product::factory()->create([
            'name' => "Fanta 500ml",
            'price' => 2500,
            'image' => "https://www.ganaderapanamericana.com/media/catalog/product/cache/30c6e1524676c3c53ef0ea5e357eeac9/f/a/fanta_500_ml_1.jpg",
            'category_id' => 2
        ]); 
        
        Product::factory()->create([
            'name' => "Sprite 500ml",
            'price' => 2500,
            'image' => "https://acdn.mitiendanube.com/stores/003/795/536/products/3080008_f-ebb3d9249298f2924816990197141632-1024-1024.jpg",
            'category_id' => 2
        ]); 
        
        Product::factory()->create([
            'name' => "Papas fritas con huevo",
            'price' => 6500,
            'image' => "https://www.cocinacaserayfacil.net/wp-content/uploads/2018/08/huevos-rotos-con-patatas.jpg",
            'category_id' => 3
        ]);
        
        Product::factory()->create([
            'name' => "Tiramisu",
            'price' => 10000,
            'image' => "https://s1.elespanol.com/2023/12/15/cocinillas/recetas/817428853_238446854_1024x576.jpg",
            'category_id' => 4
        ]);
    }
}
