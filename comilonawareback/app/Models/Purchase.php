<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $table = 'purchases';

    // Definir los campos que pueden ser asignados masivamente
    protected $fillable = [
        'totalCost',
        'payMethod',
        'clientPay',
        'changePay',
    ];
}
