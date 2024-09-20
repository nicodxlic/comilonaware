<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index(){
        $productos = [
            (object) ['nombre' => 'hamburguesa de queso', 'id' => 1, 'precio' => 10.2, 'imagen' => null, 'stock' => 20],
            (object) ['nombre' => 'milanesa', 'id' => 2, 'precio' => 7.6, 'imagen' => null, 'stock' => 15]
        ];

        return $productos;
    }

    public function crear(Request $request){
        if ($request) {

        Producto::create([
            'nombre' => $request->input('title'),
            'imagen' => $request->input('imagen'),
            'precio' => $request->input('precio'),
            'stock' => $request->input('stock'),
        ]);

        return 'articulo creado con éxito';
    } else {
        return 'No se pudo cargar la imagen.';
    }
    }
}
