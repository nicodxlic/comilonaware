<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddQuantityToOrderProductTable extends Migration
{
    public function up()
    {
        Schema::table('order_product', function (Blueprint $table) {
            $table->integer('quantity')->default(1)->after('product_id'); // Columna después de 'product_id'
        });
    }

    public function down()
    {
        Schema::table('order_product', function (Blueprint $table) {
            $table->dropColumn('quantity'); // Eliminar la columna
        });
    }
}