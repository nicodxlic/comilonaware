<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Productos;
use App\Http\Controllers\Pedidos;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/productos', [Productos::class, 'index']);
Route::post('/productos/post', [Productos::class, 'crear']);

Route::get('/pedidos', [Pedidos::class, 'index']);
Route::post('/pedidos/post', [Pedidos::class, 'crear']);

require __DIR__.'/auth.php';
