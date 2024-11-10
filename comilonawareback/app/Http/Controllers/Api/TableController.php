<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Table;

class TableController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tables = Table::all();

        return $tables;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tableCount = Table::count();
        if ($request) {
            if ($tableCount >= 20){
                return response()->json(['error' => 'No se pueden agregar más mesas. Límite alcanzado.'], 400);
            }
            $lastTableNumber = Table::max('number');
            $newTable = Table::create([
                'number' => $lastTableNumber + 1,
                'enabled' => true
            ]);
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
        $table = Table::findOrFail($id);
        $table->enabled = $request->enabled;

        $table->save();
        return $table;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        $tableCount = Table::count();
        if ($tableCount <= 5) {
            return response()->json(['error' => 'No se pueden eliminar más mesas. Mínimo de mesas alcanzado.'], 400);
        }

        $lastTable = Table::latest('id')->first();
        $lastTable->delete();

        return response()->json(['message' => 'Mesa eliminada con éxito'], 200);
    }
}
