<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

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

            return 'Pedido creado exitosamente.';
        } else {
            return 'Error.';
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }
}
