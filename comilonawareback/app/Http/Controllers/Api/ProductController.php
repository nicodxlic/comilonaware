<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

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

            $category = Category::find($request->input('category_id'));

            if (!$category) {
                return response()->json(['error' => 'Categoría no encontrada'], 404);
            }

            $product = Product::create([
                'name' => $request->input('name'),
                'image' => $request->input('image'),
                'price' => $request->input('price'),
                'deleted' => $request->input('deleted'),
                'enabled' => $request->input('enabled'),
                'category_id' => $category->id
            ]);
            return $product;
    
            return response()->json(['message' => 'Producto creado con éxito', 'product' => $product], 201);
        } else {
            return response()->json(['error' => 'Ocurrió un error'], 400);
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
        $product = Product::findOrFail($id);

        if ($request->input('category_id')) {
            $category = Category::find($request->input('category_id'));

            if (!$category) {
                return response()->json(['error' => 'Categoría no encontrada'], 404);
            }

            $product->category_id = $category->id; // Asignamos la nueva categoría
        }

        $product->name = $request->name;
        $product->image = $request->image;
        $product->price = $request->price;
        $product->deleted = $request->deleted;
        $product->enabled = $request->enabled;
        $product->save();
        return $product;
    }

    public function destroy(Request $request, string $id)
    {
        $product = Product::findOrFail($id);
        if($product->deleted == 1){
            $product->deleted = 0;
        } else if($product->deleted == 0) {
            $product->deleted = 1;
        }
        $product->save();
        return $product;
    }

    public function disable(Request $request, string $id)
    {
        $product = Product::findOrFail($id);
        if($product->enabled == 1){
            $product->enabled = 0;
        } else if($product->enabled == 0) {
            $product->enabled = 1;
        }
        $product->save();
        return $product;
    }
}
