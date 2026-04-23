<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SaiPercentileRankStanineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            ['sai' => 150, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 149, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 148, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 147, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 146, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 145, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 144, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 143, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 142, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 141, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 140, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 139, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 138, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 137, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 136, 'percentile_rank' => 99, 'stanine' => 9],
            ['sai' => 135, 'percentile_rank' => 98, 'stanine' => 9],
            ['sai' => 134, 'percentile_rank' => 98, 'stanine' => 9],
            ['sai' => 133, 'percentile_rank' => 98, 'stanine' => 9],
            ['sai' => 132, 'percentile_rank' => 98, 'stanine' => 9],
            ['sai' => 131, 'percentile_rank' => 97, 'stanine' => 9],
            ['sai' => 130, 'percentile_rank' => 97, 'stanine' => 9],
            ['sai' => 129, 'percentile_rank' => 96, 'stanine' => 9],
            ['sai' => 128, 'percentile_rank' => 96, 'stanine' => 9],

            ['sai' => 127, 'percentile_rank' => 95, 'stanine' => 8],
            ['sai' => 126, 'percentile_rank' => 95, 'stanine' => 8],
            ['sai' => 125, 'percentile_rank' => 94, 'stanine' => 8],
            ['sai' => 124, 'percentile_rank' => 93, 'stanine' => 8],
            ['sai' => 123, 'percentile_rank' => 92, 'stanine' => 8],
            ['sai' => 122, 'percentile_rank' => 91, 'stanine' => 8],
            ['sai' => 121, 'percentile_rank' => 90, 'stanine' => 8],
            ['sai' => 120, 'percentile_rank' => 89, 'stanine' => 8],

            ['sai' => 119, 'percentile_rank' => 88, 'stanine' => 7],
            ['sai' => 118, 'percentile_rank' => 87, 'stanine' => 7],
            ['sai' => 117, 'percentile_rank' => 86, 'stanine' => 7],
            ['sai' => 116, 'percentile_rank' => 84, 'stanine' => 7],
            ['sai' => 115, 'percentile_rank' => 83, 'stanine' => 7],
            ['sai' => 114, 'percentile_rank' => 81, 'stanine' => 7],
            ['sai' => 113, 'percentile_rank' => 79, 'stanine' => 7],
            ['sai' => 112, 'percentile_rank' => 77, 'stanine' => 7],

            ['sai' => 111, 'percentile_rank' => 75, 'stanine' => 6],
            ['sai' => 110, 'percentile_rank' => 73, 'stanine' => 6],
            ['sai' => 109, 'percentile_rank' => 71, 'stanine' => 6],
            ['sai' => 108, 'percentile_rank' => 69, 'stanine' => 6],
            ['sai' => 107, 'percentile_rank' => 67, 'stanine' => 6],
            ['sai' => 106, 'percentile_rank' => 65, 'stanine' => 6],
            ['sai' => 105, 'percentile_rank' => 62, 'stanine' => 6],
            ['sai' => 104, 'percentile_rank' => 60, 'stanine' => 6],

            ['sai' => 103, 'percentile_rank' => 57, 'stanine' => 5],
            ['sai' => 102, 'percentile_rank' => 55, 'stanine' => 5],
            ['sai' => 101, 'percentile_rank' => 52, 'stanine' => 5],
            ['sai' => 100, 'percentile_rank' => 50, 'stanine' => 5],
            ['sai' => 99, 'percentile_rank' => 48, 'stanine' => 5],
            ['sai' => 98, 'percentile_rank' => 45, 'stanine' => 5],
            ['sai' => 97, 'percentile_rank' => 43, 'stanine' => 5],
            ['sai' => 96, 'percentile_rank' => 40, 'stanine' => 5],

            ['sai' => 95, 'percentile_rank' => 38, 'stanine' => 4],
            ['sai' => 94, 'percentile_rank' => 35, 'stanine' => 4],
            ['sai' => 93, 'percentile_rank' => 33, 'stanine' => 4],
            ['sai' => 92, 'percentile_rank' => 31, 'stanine' => 4],
            ['sai' => 91, 'percentile_rank' => 29, 'stanine' => 4],
            ['sai' => 90, 'percentile_rank' => 27, 'stanine' => 4],
            ['sai' => 89, 'percentile_rank' => 25, 'stanine' => 4],
            ['sai' => 88, 'percentile_rank' => 23, 'stanine' => 4],

            ['sai' => 87, 'percentile_rank' => 21, 'stanine' => 3],
            ['sai' => 86, 'percentile_rank' => 19, 'stanine' => 3],
            ['sai' => 85, 'percentile_rank' => 17, 'stanine' => 3],
            ['sai' => 84, 'percentile_rank' => 16, 'stanine' => 3],
            ['sai' => 83, 'percentile_rank' => 14, 'stanine' => 3],
            ['sai' => 82, 'percentile_rank' => 13, 'stanine' => 3],
            ['sai' => 81, 'percentile_rank' => 12, 'stanine' => 3],
            ['sai' => 80, 'percentile_rank' => 11, 'stanine' => 3],

            ['sai' => 79, 'percentile_rank' => 10, 'stanine' => 2],
            ['sai' => 78, 'percentile_rank' => 9, 'stanine' => 2],
            ['sai' => 77, 'percentile_rank' => 8, 'stanine' => 2],
            ['sai' => 76, 'percentile_rank' => 7, 'stanine' => 2],
            ['sai' => 75, 'percentile_rank' => 6, 'stanine' => 2],
            ['sai' => 74, 'percentile_rank' => 5, 'stanine' => 2],
            ['sai' => 73, 'percentile_rank' => 5, 'stanine' => 2],
            ['sai' => 72, 'percentile_rank' => 4, 'stanine' => 2],
            ['sai' => 71, 'percentile_rank' => 4, 'stanine' => 2],

            ['sai' => 70, 'percentile_rank' => 3, 'stanine' => 1],
            ['sai' => 69, 'percentile_rank' => 3, 'stanine' => 1],
            ['sai' => 68, 'percentile_rank' => 2, 'stanine' => 1],
            ['sai' => 67, 'percentile_rank' => 2, 'stanine' => 1],
            ['sai' => 66, 'percentile_rank' => 2, 'stanine' => 1],
            ['sai' => 65, 'percentile_rank' => 1, 'stanine' => 1],
            ['sai' => 64, 'percentile_rank' => 1, 'stanine' => 1],
            ['sai' => 63, 'percentile_rank' => 1, 'stanine' => 1],
            ['sai' => 62, 'percentile_rank' => 1, 'stanine' => 1],
            ['sai' => 61, 'percentile_rank' => 1, 'stanine' => 1],
            ['sai' => 60, 'percentile_rank' => 1, 'stanine' => 1],
            ['sai' => 59, 'percentile_rank' => 1, 'stanine' => 1],
            ['sai' => 58, 'percentile_rank' => 1, 'stanine' => 1],
        ];

        DB::table('sai_percentile_rank_and_stanines')->insert(
            collect($rows)->map(fn($row) => array_merge($row, [
                'created_at' => now(),
                'updated_at' => now(),
            ]))->toArray()
        );
    }
}
