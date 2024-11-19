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
        $purchase = Purchase::with('payments')->findOrFail($id);

        $totalPaid = $purchase->payments->sum('amount');
    
        return response()->json([
            'purchase' => $purchase,
            'totalPaid' => $totalPaid,
            'remaining' => $purchase->totalCost - $totalPaid,
        ]);
    }

    // Método para crear una nueva compra
    public function store(Request $request)
    {
        if ($request) {

            $purchase = Purchase::create([
                'id' => $request->input('id'),
                'totalCost' => $request->input('totalCost'),
            ]);
            return $purchase;
        } else {
            return 'No se pudo cargar la imagen.';
        }
    }

    // Método para actualizar una compra existente
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'totalCost' => 'numeric',
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
            'message' => 'Compra eliminada exitosamente',
        ]);
    }

public function showOrdersByPurchase(string $id)
{
    $purchase = Purchase::where('order_id', $id)->get();
    return $purchase;

}

public function cancelPurchase($id)
{
    $purchase = Purchase::findOrFail($id);

    if ($purchase->status === 'pagado') {
        return response()->json([
            'message' => 'No se puede cancelar un pedido pagado.',
        ], 400);
    }

    $purchase->update(['status' => 'cancelado']);

    return response()->json([
        'message' => 'Pedido cancelado exitosamente.',
        'purchase' => $purchase,
    ]);
}

public function showPayments($id)
{
    $purchase = Purchase::with('payments')->findOrFail($id);
    return response()->json($purchase->payments);
}

}