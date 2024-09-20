<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\PedidoController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/productos', [ProductoController::class, 'index']);
Route::post('/productos/post', [ProductoController::class, 'crear']);

Route::get('/pedidos', [PedidoController::class, 'index']);
Route::post('/pedidos/post', [PedidoController::class, 'crear']);

require __DIR__.'/auth.php';
