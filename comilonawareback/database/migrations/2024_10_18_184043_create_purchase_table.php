<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purchase', function (Blueprint $table) {
            $table->id(); // ID autoincrementable
            $table->float('totalCost', 8, 2); // Costo total con hasta 2 decimales
            $table->string('payMethod'); // Método de pago como texto
            $table->float('clientPay', 8, 2); // Pago del cliente con hasta 2 decimales
            $table->float('changePay', 8, 2); // Cambio a devolver con hasta 2 decimales
            $table->timestamps(); // Marcas de tiempo (created_at, updated_at)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase');
    }
};
