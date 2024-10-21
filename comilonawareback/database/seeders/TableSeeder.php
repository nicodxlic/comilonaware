<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Table;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Table::factory()->create([
            'number' => 1
        ]);

        Table::factory()->create([
            'number' => 2
        ]);

        Table::factory()->create([
            'number' => 3
        ]);

        Table::factory()->create([
            'number' => 4
        ]);

        Table::factory()->create([
            'number' => 5
        ]);

        Table::factory()->create([
            'number' => 6
        ]);

        Table::factory()->create([
            'number' => 7
        ]);

        Table::factory()->create([
            'number' => 8
        ]);

        Table::factory()->create([
            'number' => 9
        ]);

        Table::factory()->create([
            'number' => 10
        ]);

        Table::factory()->create([
            'number' => 11
        ]);
        Table::factory()->create([
            'number' => 12
        ]);
    }
}
