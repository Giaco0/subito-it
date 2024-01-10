<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['common_name', 'description', 'country'];

    public function productImages()
    {
        return $this->hasMany('App\Models\ProductImage');
    }
}
