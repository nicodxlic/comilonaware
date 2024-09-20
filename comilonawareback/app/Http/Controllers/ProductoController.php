<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index(){
        $productos = Producto::all();

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
