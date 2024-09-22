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

/*Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index');
    Route::post('/product', 'store');
    Route::get('/product/{$id}', 'show');
    Route::put('/product/{$id}', 'update');
    Route::delete('/product/{$id}', 'destroy');
}); Posible cambio*/

require __DIR__.'/auth.php';
