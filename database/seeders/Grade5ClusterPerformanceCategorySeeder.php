<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Grade5ClusterPerformanceCategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cluster_performance_categories')->insert([
            ['grade' => 5, 'cluster' => 'total', 'number_of_items' => 72, 'below_min' => 0, 'below_max' => 32, 'average_min' => 33, 'average_max' => 53, 'above_min' => 54, 'above_max' => 72, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 5, 'cluster' => 'verbal', 'number_of_items' => 36, 'below_min' => 0, 'below_max' => 16, 'average_min' => 17, 'average_max' => 27, 'above_min' => 28, 'above_max' => 36, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 5, 'cluster' => 'verbal_comprehension', 'number_of_items' => 12, 'below_min' => 0, 'below_max' => 6, 'average_min' => 7, 'average_max' => 10, 'above_min' => 11, 'above_max' => 12, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 5, 'cluster' => 'verbal_reasoning', 'number_of_items' => 24, 'below_min' => 0, 'below_max' => 9, 'average_min' => 10, 'average_max' => 16, 'above_min' => 17, 'above_max' => 24, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 5, 'cluster' => 'nonverbal', 'number_of_items' => 36, 'below_min' => 0, 'below_max' => 15, 'average_min' => 16, 'average_max' => 26, 'above_min' => 27, 'above_max' => 36, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 5, 'cluster' => 'figural_reasoning', 'number_of_items' => 18, 'below_min' => 0, 'below_max' => 7, 'average_min' => 8, 'average_max' => 12, 'above_min' => 13, 'above_max' => 18, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 5, 'cluster' => 'quantitative_reasoning', 'number_of_items' => 18, 'below_min' => 0, 'below_max' => 7, 'average_min' => 8, 'average_max' => 14, 'above_min' => 15, 'above_max' => 18, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
