<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Purchase;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payment = Payment::all();
        return $payment;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request) {
            $purchaseId = $request->purchase_id;
            $payment = Payment::create([
                'id' => $request->input('id'),
                'purchase_id' => $request->input('purchase_id'),
                'paymentMethod' => $request->input('paymentMethod'),
                'amount' => $request->input('amount'),
                'change' => $request->input('change'),
            ]);

            $purchase = Purchase::with('payments')->findOrFail($purchaseId);
            $totalPaid = $purchase->payments->sum('amount');
        
            if ($totalPaid >= $purchase->totalCost) {
                $purchase->update(['status' => 'pagado']);
            }
        
            return response()->json([
                'message' => 'Pago registrado correctamente',
                'purchase' => $purchase,
            ]);

            return $payment;

        } else {
            return 'Hubo un problema al registrar el pago.';
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $payment = Payment::find($id);
        return $payment;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();
        return response()-json([
            'message' => 'Pago eliminado correctamente',
        ]);
    }
}
