<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'table',
        'price',
        'status',
    ];

    public function products(){
        return $this->belongsToMany(Product::class);
    }
    public function purchase(){
        return $this->belongsTo(Purchase::class);
    }
    /*
    //Relación uno a muchos inversa con Users.
    public function user(){
        return $this->belongsTo(User::class);
    }

    //Relación uno a muchos inversa con Category.
    public function category(){
        return $this->belongsTo(Category::class);
        }
    */
}
