<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order_Product;

class Order_ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order_products = Order_Product::all();

        return $order_products;
    }
    /*
    
    public function store(Request $request)
    {
        if ($request) {

            Product::create([
                'name' => $request->input('name'),
                'image' => $request->input('image'),
                'price' => $request->input('price'),
                'stock' => $request->input('stock'),
            ]);
    
            return 'Articulo creado con éxito';
        } else {
            return 'No se pudo cargar la imagen.';
        }
        
    }
    

    
    public function show(string $id)
    {
        $product = Product::find($id);
        return $product;
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($request->$id);
        $product->name = $request->name;
        $product->image = $request->image;
        $product->price = $request->price;
        $product->stock = $request->stock;

        $product->save();
        return $product;
    }

    public function destroy(Request $request)
    {
        $product = Product::destroy($request->id);
        return $product;
    }
     */
}
