<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Grade8ClusterPerformanceCategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cluster_performance_categories')->insert([
            ['grade' => 8, 'cluster' => 'total', 'number_of_items' => 72, 'below_min' => 0, 'below_max' => 31, 'average_min' => 32, 'average_max' => 53, 'above_min' => 54, 'above_max' => 72, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 8, 'cluster' => 'verbal', 'number_of_items' => 36, 'below_min' => 0, 'below_max' => 14, 'average_min' => 15, 'average_max' => 26, 'above_min' => 27, 'above_max' => 36, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 8, 'cluster' => 'verbal_comprehension', 'number_of_items' => 12, 'below_min' => 0, 'below_max' => 6, 'average_min' => 7, 'average_max' => 10, 'above_min' => 11, 'above_max' => 12, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 8, 'cluster' => 'verbal_reasoning', 'number_of_items' => 24, 'below_min' => 0, 'below_max' => 8, 'average_min' => 9, 'average_max' => 16, 'above_min' => 17, 'above_max' => 24, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 8, 'cluster' => 'nonverbal', 'number_of_items' => 36, 'below_min' => 0, 'below_max' => 15, 'average_min' => 16, 'average_max' => 28, 'above_min' => 29, 'above_max' => 36, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 8, 'cluster' => 'figural_reasoning', 'number_of_items' => 18, 'below_min' => 0, 'below_max' => 7, 'average_min' => 8, 'average_max' => 13, 'above_min' => 14, 'above_max' => 18, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 8, 'cluster' => 'quantitative_reasoning', 'number_of_items' => 18, 'below_min' => 0, 'below_max' => 7, 'average_min' => 8, 'average_max' => 15, 'above_min' => 16, 'above_max' => 18, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
