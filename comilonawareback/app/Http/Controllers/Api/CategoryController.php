<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return $categories;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request) {

            $category = Category::create([
                'name' => $request->input('name'),
                'deleted' => $request->input('deleted')
            ]);
    
            return $category;
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        return $category;
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->deleted = $request->deleted;
        $category->save();
        return $category;
    }

    public function destroy(Request $request, string $id)
    {
        $category = Category::findOrFail($id);
        if($category->deleted == 1){
            $category->deleted = 0;
        } else if($category->deleted == 0) {
            $category->deleted = 1;
        }
        $category->save();
        return $category;
    }

}
