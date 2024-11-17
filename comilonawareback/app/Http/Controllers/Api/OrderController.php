<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Purchase;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $orders = Order::all();

        return $orders;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        if ($request) {
            $order = Order::create([
                'table' => $request->input('table'),
                'status' => $request->input('status'),
                'price' => $request->input('price'),
            ]);

            foreach ($request->products as $product) {
                $order->products()->attach($product['id']);
            }

            
            $purchase = Purchase::create([
                'order_id' => $order->id,
                'totalCost' => $order->price,
                'status' => 'Pendiente',
            ]);

            $order->purchase_id = $purchase->id;
            $order->save();
            return 'Pedido creado exitosamente.';
        } else {
            return 'Error.';
        }
    }

    /**
     * Display the specified resource.
     */
    public function showPurchaseOrders(string $id)
    {
        $orders = Order::where('purchase_id', $id)->get();
        return $orders;

    }

    public function showTableOrders(string $table)
    {
        $orders = Order::where('table', $table)->get();
        return $orders;
    }

    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);
        $order->table = $request->table;
        $order->price = $request->price;
        $order->status = $request->status;
        $order->purchase_id = $request->purchase_id;

        $order->save();
        return $order;
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(Request $request, string $id)
    {
        $order = Order::findOrFail($id);
        $status = $request->input('status');
        if($status == 'in process' || $status == 'pending' ||
        $status == 'ready' || $status == 'delivered' || 
        $status == 'canceled' || $status == 'deleted'){
            $order->status = $status;
            $order->save();
        }
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
    }
}
