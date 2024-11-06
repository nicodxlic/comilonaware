<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\Order_ProductController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\PurchaseController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\MercadoPagoController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index');
    Route::patch('/product/disable/{id}', 'disable');
    Route::post('/product', 'store');
    Route::get('/product/{id}', 'show');
    Route::put('/product/update/{id}', 'update');
    Route::put('/product/delete/{id}', 'destroy');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::post('/category', 'store');
    Route::get('/category/{id}', 'show');
    Route::put('/category/update/{id}', 'update');
    Route::put('/category/delete/{id}', 'destroy');
});

Route::controller(Order_ProductController::class)->group(function () {
    Route::get('/orders_products', 'index');
    Route::get('/orders_products/{id}', 'show');
});

Route::controller(PurchaseController::class)->group(function () {
    Route::get('/purchases', 'index');
    Route::get('/purchase/{id}', 'show');
    Route::put('/purchase/{id}', 'update');
    Route::post('/purchase', 'store');
    Route::delete('/purchase/{id}', 'destroy');
});

Route::controller(OrderController::class)->group(function () {
    Route::get('/orders', 'index');
    Route::post('/order', 'store');
    //Route::get('/order/{id}', 'show');
    Route::get('/order/purchase/{id}', 'showPurchaseOrders');
    Route::get('/order/table/{table}', 'showTableOrders');
    Route::patch('/order/{id}', 'update');
    Route::put('/order/status/{id}', 'updateStatus');
    Route::delete('/order/delete/{id}', 'destroy');
    //Route::get('/get-orders', 'getOrdersByTable');
});

Route::controller(TableController::class)->group(function () {
    Route::get('/tables', 'index');
    Route::put('/table/{id}', 'update');
});

Route::controller(MercadoPagoController::class)->group(function () {
    Route::post('/create-preference', 'createPreference');
});

Route::get('/payment/success', function () {
    return "Pago realizado exitosamente";
})->name('payment.success');

Route::get('/payment/failure', function () {
    return "El pago ha fallado";
})->name('payment.failure');

Route::get('/payment/pending', function () {
    return "El pago está pendiente";
})->name('payment.pending');