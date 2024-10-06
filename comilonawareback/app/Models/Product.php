<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'price',
        'image',
        'stock',
        'enabled'
    ];

    public function orders(){
        return $this->belongsToMany(Order::class);
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
