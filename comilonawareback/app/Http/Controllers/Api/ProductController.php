<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();

        return $products;
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
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

    public function destroy(string $id)
    {
        $product = Product::destroy($id);
        return $product;
    }
}
