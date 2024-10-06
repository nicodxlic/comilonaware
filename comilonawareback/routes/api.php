<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\Order_ProductController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index');
    Route::patch('/product/disable/{id}', 'disable');
    Route::post('/product', 'store');
    Route::get('/product/{id}', 'show');
    Route::put('/product/{id}', 'update');
    Route::post('/product/delete', 'destroy');
});

Route::controller(Order_ProductController::class)->group(function () {
    Route::get('/orders_products', 'index');
    Route::get('/orders_products/{id}', 'show');
});

Route::controller(OrderController::class)->group(function () {
    Route::get('/orders', 'index');
    Route::post('/order', 'store');
    Route::get('/order/{$id}', 'show');
    Route::put('/order/{$id}', 'update');
    Route::post('/order/delete', 'destroy');
});