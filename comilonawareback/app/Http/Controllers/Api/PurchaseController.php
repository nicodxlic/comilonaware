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
        try {
            $purchases = Purchase::all();
            return response()->json($purchases, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al obtener las compras', 'details' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar una compra en particular
    public function show($id)
    {
        try {
            $purchase = Purchase::findOrFail($id);
            return response()->json($purchase, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Compra no encontrada', 'details' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al obtener la compra', 'details' => $e->getMessage()], 500);
        }
    }

    // Método para crear una nueva compra
    public function store(Request $request)
    {
        try {
            $purchase = Purchase::create([
                'id' => $request->input('id'),
                'totalCost' => $request->input('totalCost'),
                'payMethod' => $request->input('payMethod'),
                'clientPay' => $request->input('clientPay'),
                'changePay' => $request->input('changePay'),
            ]);

            return response()->json($purchase, 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al crear la compra', 'details' => $e->getMessage()], 500);
        }
    }

    // Método para actualizar una compra existente
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'totalCost' => 'numeric',
                'payMethod' => 'string',
                'clientPay' => 'numeric',
                'changePay' => 'numeric',
            ]);

            $purchase = Purchase::findOrFail($id);
            $purchase->update($validatedData);

            return response()->json($purchase, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Compra no encontrada', 'details' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al actualizar la compra', 'details' => $e->getMessage()], 500);
        }
    }

    // Método para eliminar una compra
    public function destroy($id)
    {
        try {
            $purchase = Purchase::findOrFail($id);
            $purchase->delete();

            return response()->json(['message' => 'Compra eliminada con éxito'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Compra no encontrada', 'details' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al eliminar la compra', 'details' => $e->getMessage()], 500);
        }
    }
}
