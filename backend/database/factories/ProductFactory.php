<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'common_name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'country' => $this->faker->country,
        ];
    }
}
