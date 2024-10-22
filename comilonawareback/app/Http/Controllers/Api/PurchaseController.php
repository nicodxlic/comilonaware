<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use App\Models\Order;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    // Método para listar todas las compras
    public function index()
    {
        $purchases = Purchase::all();
        return response()->json($purchases);
    }

    // Método para mostrar una compra en particular
    public function show($id)
    {
        $purchase = Purchase::findOrFail($id);
        return response()->json($purchase);
    }

    // Método para crear una nueva compra
    public function store(Request $request)
    {
        if ($request) {

            Purchase::create([
                'id' => $request->input('id'),
                'totalCost' => $request->input('totalCost'),
                'payMethod' => $request->input('payMethod'),
                'clientPay' => $request->input('clientPay'),
                'changePay' => $request->input('changePay'),
            ]);
            foreach ($request->orders as $order) {
                $order->orders()->attach($order['id']);
            }
    
            return 'Articulo creado con éxito';
        } else {
            return 'No se pudo cargar la imagen.';
        }
    }

    // Método para actualizar una compra existente
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'totalCost' => 'numeric',
            'payMethod' => 'string',
            'clientPay' => 'numeric',
            'changePay' => 'numeric',
        ]);

        $purchase = Purchase::findOrFail($id);
        $purchase->update($validatedData);

        return $purchase;
    }

    // Método para eliminar una compra
    public function destroy($id)
    {
        $purchase = Purchase::findOrFail($id);
        $purchase->delete();

        return response()->json([
            'message' => 'Purchase deleted successfully',
        ]);
    }
}
