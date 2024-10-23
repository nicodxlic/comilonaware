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
        'deleted',
        'enabled',
        'category_id'
    ];

    public function orders(){
        return $this->belongsToMany(Order::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
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
