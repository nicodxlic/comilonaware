<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_id',
        'paymentMethod',
        'amount',
        'change',
    ];

    public function order()
    {
        return $this->belongsTo(Purchase::class);
    }
}