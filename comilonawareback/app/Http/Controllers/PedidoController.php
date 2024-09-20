<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index(){
        $pedidos = Pedido::all();

        return $pedidos;
    }

    public function crear(Request $request){
        if ($request) {

        $pedido = Pedido::create([
            'mesa' => $request->input('mesa'),
            'estado' => $request->input('estado'),
            'precio' => $request->input('precio'),
            //'id_usuario' => Auth::id(),
        ]);

        $pedido->productos()->attach($request->input('productos'));

        return 'pedido creado con éxito';
    } else {
        return 'No se pudo cargar la imagen.';
    }
    }
}
