<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Grade10ClusterPerformanceCategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cluster_performance_categories')->insert([
            ['grade' => 10, 'cluster' => 'total', 'number_of_items' => 72, 'below_min' => 0, 'below_max' => 24, 'average_min' => 25, 'average_max' => 43, 'above_min' => 44, 'above_max' => 72, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 10, 'cluster' => 'verbal', 'number_of_items' => 36, 'below_min' => 0, 'below_max' => 11, 'average_min' => 12, 'average_max' => 21, 'above_min' => 22, 'above_max' => 36, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 10, 'cluster' => 'verbal_comprehension', 'number_of_items' => 12, 'below_min' => 0, 'below_max' => 4, 'average_min' => 5, 'average_max' => 8, 'above_min' => 9, 'above_max' => 12, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 10, 'cluster' => 'verbal_reasoning', 'number_of_items' => 24, 'below_min' => 0, 'below_max' => 6, 'average_min' => 7, 'average_max' => 13, 'above_min' => 14, 'above_max' => 24, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 10, 'cluster' => 'nonverbal', 'number_of_items' => 36, 'below_min' => 0, 'below_max' => 12, 'average_min' => 13, 'average_max' => 24, 'above_min' => 25, 'above_max' => 36, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 10, 'cluster' => 'figural_reasoning', 'number_of_items' => 18, 'below_min' => 0, 'below_max' => 5, 'average_min' => 6, 'average_max' => 10, 'above_min' => 11, 'above_max' => 18, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 10, 'cluster' => 'quantitative_reasoning', 'number_of_items' => 18, 'below_min' => 0, 'below_max' => 6, 'average_min' => 7, 'average_max' => 12, 'above_min' => 13, 'above_max' => 18, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
