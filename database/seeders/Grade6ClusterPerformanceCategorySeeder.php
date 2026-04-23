<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Grade6ClusterPerformanceCategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cluster_performance_categories')->insert([
            ['grade' => 6, 'cluster' => 'total', 'number_of_items' => 72, 'below_min' => 0, 'below_max' => 28, 'average_min' => 29, 'average_max' => 47, 'above_min' => 48, 'above_max' => 72, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 6, 'cluster' => 'verbal', 'number_of_items' => 36, 'below_min' => 0, 'below_max' => 13, 'average_min' => 14, 'average_max' => 23, 'above_min' => 24, 'above_max' => 36, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 6, 'cluster' => 'verbal_comprehension', 'number_of_items' => 12, 'below_min' => 0, 'below_max' => 5, 'average_min' => 6, 'average_max' => 8, 'above_min' => 9, 'above_max' => 12, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 6, 'cluster' => 'verbal_reasoning', 'number_of_items' => 24, 'below_min' => 0, 'below_max' => 7, 'average_min' => 8, 'average_max' => 14, 'above_min' => 15, 'above_max' => 24, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 6, 'cluster' => 'nonverbal', 'number_of_items' => 36, 'below_min' => 0, 'below_max' => 13, 'average_min' => 14, 'average_max' => 25, 'above_min' => 26, 'above_max' => 36, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 6, 'cluster' => 'figural_reasoning', 'number_of_items' => 18, 'below_min' => 0, 'below_max' => 6, 'average_min' => 7, 'average_max' => 12, 'above_min' => 13, 'above_max' => 18, 'created_at' => now(), 'updated_at' => now()],
            ['grade' => 6, 'cluster' => 'quantitative_reasoning', 'number_of_items' => 18, 'below_min' => 0, 'below_max' => 6, 'average_min' => 7, 'average_max' => 13, 'above_min' => 14, 'above_max' => 18, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
