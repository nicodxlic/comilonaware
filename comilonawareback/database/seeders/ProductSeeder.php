<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory()->create([
            'name' => "Ravioles con salsa de champiñones",
            'price' => 8700,
            'image' => "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAFdX3RKFH9SlSxE-CFLbcFB-LmKtr-RlicCMjh1D331UIN9zaYpUAhL27o5jXV2-bSule1GwyRaO0iHCOC4dP-crKQBONvlTFB40EKx8kKbVo2zDD1XsE8aBxtBs3YOdlrg_QZO5CgqI/s1600/raviolis+con+salsa+de+champi%C3%B1ones.jpg",
            'category_id' => 1,
            'description' => 
            'Deliciosos ravioles rellenos de ricota y espinaca, 
            servidos con una cremosa salsa de champiñones frescos, 
            realzada con un toque de ajo y parmesano.'
        ]);
        
        Product::factory()->create([
            'name' => "Hamburguesa con queso",
            'price' => 7900,
            'image' => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqIvY_EddgWVLKNZD3S-xTjijRkfogKFxFkA&s",
            'category_id' => 1,
            'description' => 
            'Jugosa carne a la parrilla con queso fundido, servida 
            en un pan esponjoso con los condimentos clásicos.'
        ]);

        Product::factory()->create([
            'name' => "Milanesa napolitana",
            'price' => 6700,
            'image' => "https://animalgourmet.com/wp-content/uploads/2023/09/Milanesa-a-la-napolitana1.jpeg",
            'category_id' => 1,
            'description' => 
            'crujiente milanesa de carne o pollo cubierta con salsa de 
            tomate, jamón y queso gratinado, servida con una guarnición 
            de puré de papas o ensalada fresca.'
        ]);
        
        Product::factory()->create([
            'name' => "Coca cola 500ml",
            'price' => 2500,
            'image' => "https://puntodesalud.com.ar/25922-large_default/coca-cola-original-500-ml.jpg",
            'category_id' => 2,
            'description' => 
            'Refrescante bebida carbonatada, ideal para acompañar 
            cualquier comida.'
        ]);
        
        Product::factory()->create([
            'name' => "Fanta 500ml",
            'price' => 2500,
            'image' => "https://www.ganaderapanamericana.com/media/catalog/product/cache/30c6e1524676c3c53ef0ea5e357eeac9/f/a/fanta_500_ml_1.jpg",
            'category_id' => 2,
            'description' => 
            'Gaseosa con sabor a naranja, perfecta para un toque dulce y 
            burbujeante.'
        ]);
        
        Product::factory()->create([
            'name' => "Sprite 500ml",
            'price' => 2500,
            'image' => "https://acdn.mitiendanube.com/stores/003/795/536/products/3080008_f-ebb3d9249298f2924816990197141632-1024-1024.jpg",
            'category_id' => 2,
            'description' => 
            'Gaseosa con sabor a limón y lima, refrescante y ligera.'
        ]);
        
        Product::factory()->create([
            'name' => "Papas fritas con huevo",
            'price' => 6500,
            'image' => "https://www.cocinacaserayfacil.net/wp-content/uploads/2018/08/huevos-rotos-con-patatas.jpg",
            'category_id' => 3,
            'description' => 
            'Papas crujientes servidas con un huevo frito, una combinación
             clásica y sabrosa.'
        ]);

        Product::factory()->create([
            'name' => "Ensalada mixta",
            'price' => 5000,
            'image' => "https://imag.bonviveur.com/imagen-de-la-ensalada-mixta.jpg",
            'category_id' => 3,
            'description' => 
            'una fresca combinación de lechuga, tomate, 
            cebolla y zanahoria rallada, aderezada con aceite de oliva, 
            vinagre y un toque de sal.'
        ]);
        
        Product::factory()->create([
            'name' => "Tiramisu",
            'price' => 10000,
            'image' => "https://s1.elespanol.com/2023/12/15/cocinillas/recetas/817428853_238446854_1024x576.jpg",
            'category_id' => 4,
            'description' => 
            'Postre italiano cremoso con capas de mascarpone, café y 
            cacao, un final dulce y elegante para tu comida.'
        ]);

        Product::factory()->create([
            'name' => "Flan",
            'price' => 7500,
            'image' => "https://mojo.generalmills.com/api/public/content/nVkc4H0aVkCcWbegp426XA_gmi_hi_res_jpeg.jpeg?v=24c5e8e8&t=16e3ce250f244648bef28c5949fb99ff",
            'category_id' => 4,
            'description' => 
            'un clásico postre de textura suave y cremosa, 
            elaborado con leche, huevos y azúcar, servido con 
            caramelo líquido.'
        ]);

        Product::factory()->create([
            'name' => "Brownies con helado",
            'price' => 9500,
            'image' => "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/BS7XK3UP25GMJO3G5IXXDXCRCE.png",
            'category_id' => 4,
            'description' => 
            'un bizcocho de chocolate intenso, acompañado de una bola de 
            helado de vainilla y un toque de salsa de chocolate.'
        ]);
    }
}