<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index(){
        $pedidos = [
            (object) ['mesa' => 3, 'id' => 1, 'precio' => 20.5, 'estado' => 'pendiente', 'id_usuario' => 1],
            (object) ['nombre' => 'milanesa', 'id' => 2, 'precio' => 15.6, 'estado' => 'pendiente', 'id_usuario' => 1]
        ];

        return $pedidos;
    }

    public function crear(Request $request){
        if ($request) {

        Pedido::create([
            'mesa' => $request->input('mesa'),
            'estado' => $request->input('estado'),
            'precio' => $request->input('precio'),
            //'id_usuario' => Auth::id(),
        ]);

        return 'pedido creado con éxito';
    } else {
        return 'No se pudo cargar la imagen.';
    }
    }
}
