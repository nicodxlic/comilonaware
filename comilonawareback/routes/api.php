<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\Order_ProductController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\PurchaseController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MercadoPagoController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Acceso para mozo y admin.
 */
Route::middleware(['role:Admin|Mozo'])->group(function () {

    Route::post('/order', [OrderController::class, 'store']);
    Route::post('/purchase', [PurchaseController::class, 'store']);

});

/**
 * Acceso para admin
 */
Route::middleware(['role:Admin'])->group(function () {

    Route::post('/product', [ProductController::class, 'store']);
    Route::put('/table/{id}', [TableController::class, 'update']);
    Route::delete('/table/{id}', [TableController::class, 'destroy']);
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
});

Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index');
    Route::post('/users/change-role/{id}', 'changeRole');
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
    //Route::post('/purchase', 'store');
    Route::delete('/purchase/{id}', 'destroy');
    Route::get('purchase/{id}/orders', 'showOrdersByPurchase');
    Route::patch('purchase/{id}/cancel', 'cancelPurchase');
    Route::get('/purchase/{id}/payments', 'showPayments');
});


Route::controller(OrderController::class)->group(function () {
    Route::get('/orders', 'index');
    //Route::post('/order', 'store');
    //Route::get('/order/{id}', 'show');
    Route::get('/order/purchase/{id}', 'showPurchaseOrders');
    Route::get('/order/table/{table}', 'showTableOrders');
    Route::patch('/order/{id}', 'update');
    Route::put('/order/status/{id}', 'updateStatus');
    Route::delete('/order/delete/{id}', 'destroy');
});

Route::controller(TableController::class)->group(function () {
    Route::get('/tables', 'index');
    //Route::put('/table/{id}', 'update');
    Route::post('/tables', 'store');
    //Route::delete('/table/{id}', 'destroy');
});

Route::controller(PaymentController::class)->group(function () {
    Route::get('/payments', 'index');
    Route::post('/payment/{id}', 'store');
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

//Route::get('/roles-permissions', [UserController::class, 'listRolesAndPermissions']); Incluir en alguna ruta de userController

/**
 * Acceso para los tres roles.
 */

/*
Route::middleware(['role:Admin|Mozo|Chef'])->group(function () {

    
    Route::get('/roles-permissions', [UserController::class, 'listRolesAndPermissions']);
    Route::post('/users/{id}/assign-role', [UserController::class, 'assignRole']);
    Route::post('/users/{id}/remove-role', [UserController::class, 'removeRole']);
    Route::post('/users/{id}/assign-permission', [UserController::class, 'assignPermission']);
    Route::post('/users/{id}/remove-permission', [UserController::class, 'removePermission']);

    Route::post('/logout', [AuthController::class, 'logout']);

    
    Route::get('/orders', [OrderController::class, 'index']);
    
}); */