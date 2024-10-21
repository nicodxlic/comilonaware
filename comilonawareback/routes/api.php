<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\Order_ProductController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\PurchaseController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index');
    Route::patch('/product/disable/{id}', 'disable');
    Route::post('/product', 'store');
    Route::get('/product/{id}', 'show');
    Route::put('/product/{id}', 'update');
    Route::put('/product/delete/{id}', 'destroy');
});

Route::controller(Order_ProductController::class)->group(function () {
    Route::get('/orders_products', 'index');
    Route::get('/orders_products/{id}', 'show');
});

Route::controller(PurchaseController::class)->group(function () {
    Route::get('/purchase', 'index');
    Route::get('/purchase/{id}', 'show');
    Route::put('/purchase/{id}', 'update');
    Route::post('/purchase', 'store');
    Route::delete('/purchase/{id}', 'destroy');
});

Route::controller(OrderController::class)->group(function () {
    Route::get('/orders', 'index');
    Route::post('/order', 'store');
    Route::get('/order/{id}', 'show');
    Route::patch('/order/{id}', 'update');
    Route::put('/order/status/{id}', 'updateStatus');
    Route::delete('/order/delete/{id}', 'destroy');
});

Route::controller(TableController::class)->group(function () {
    Route::get('/tables', 'index');
    Route::put('/table/{id}', 'update');
});