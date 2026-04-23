<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Grade4ClusterPerformanceCategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cluster_performance_categories')->insert([
            [
                'grade' => 4,
                'cluster' => 'total',
                'number_of_items' => 72,
                'below_min' => 0,
                'below_max' => 25,
                'average_min' => 26,
                'average_max' => 46,
                'above_min' => 47,
                'above_max' => 72,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grade' => 4,
                'cluster' => 'verbal',
                'number_of_items' => 36,
                'below_min' => 0,
                'below_max' => 12,
                'average_min' => 13,
                'average_max' => 24,
                'above_min' => 25,
                'above_max' => 36,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grade' => 4,
                'cluster' => 'verbal_comprehension',
                'number_of_items' => 12,
                'below_min' => 0,
                'below_max' => 5,
                'average_min' => 6,
                'average_max' => 9,
                'above_min' => 10,
                'above_max' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grade' => 4,
                'cluster' => 'verbal_reasoning',
                'number_of_items' => 24,
                'below_min' => 0,
                'below_max' => 7,
                'average_min' => 8,
                'average_max' => 14,
                'above_min' => 15,
                'above_max' => 24,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grade' => 4,
                'cluster' => 'nonverbal',
                'number_of_items' => 36,
                'below_min' => 0,
                'below_max' => 12,
                'average_min' => 13,
                'average_max' => 23,
                'above_min' => 24,
                'above_max' => 36,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grade' => 4,
                'cluster' => 'figural_reasoning',
                'number_of_items' => 18,
                'below_min' => 0,
                'below_max' => 5,
                'average_min' => 6,
                'average_max' => 11,
                'above_min' => 12,
                'above_max' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grade' => 4,
                'cluster' => 'quantitative_reasoning',
                'number_of_items' => 18,
                'below_min' => 0,
                'below_max' => 6,
                'average_min' => 7,
                'average_max' => 12,
                'above_min' => 13,
                'above_max' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
