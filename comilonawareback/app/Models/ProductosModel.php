<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'nombre',
        'precio',
        'imagen',
        'stock',
    ];
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
