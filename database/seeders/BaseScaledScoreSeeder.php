<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

abstract class BaseScaledScoreSeeder extends Seeder
{
    abstract protected function age(): int;

    abstract protected function type(): string;

    abstract protected function table0To2(): array;

    abstract protected function table3To5(): array;

    abstract protected function table6To8(): array;

    abstract protected function table9To11(): array;

    public function run(): void
    {
        $table_0_2 = $this->table0To2();
        $table_3_5 = $this->table3To5();
        $table_6_8 = $this->table6To8();
        $table_9_11 = $this->table9To11();

        $monthGroups = [
            ['min' => 0, 'max' => 2],
            ['min' => 3, 'max' => 5],
            ['min' => 6, 'max' => 8],
            ['min' => 9, 'max' => 11],
        ];

        $table = [];

        foreach ($table_0_2 as $sai => $_) {
            $table[$sai] = [
                $table_0_2[$sai] ?? null,
                $table_3_5[$sai] ?? null,
                $table_6_8[$sai] ?? null,
                $table_9_11[$sai] ?? null,
            ];
        }

        $insertData = [];

        foreach ($table as $sai => $ranges) {
            foreach ($ranges as $index => $range) {
                if ($range === null) {
                    continue;
                }

                $month = $monthGroups[$index];
                [$min, $max] = $this->parseRange($range);

                $insertData[] = [
                    'age' => $this->age(),
                    'sai' => $sai,
                    'type' => $this->type(),
                    'min_month' => $month['min'],
                    'max_month' => $month['max'],
                    'min_value' => $min,
                    'max_value' => $max,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('scaled_scores_to_sais')->insert($insertData);
    }

    protected function parseRange(string $range): array
    {
        $range = strtolower(trim($range));

        if (str_contains($range, 'above')) {
            preg_match('/\d+/', $range, $num);
            return [(int) $num[0] + 1, 9999];
        }

        if (str_contains($range, 'below')) {
            preg_match('/\d+/', $range, $num);
            return [0, (int) $num[0] - 1];
        }

        if (str_contains($range, '-')) {
            [$min, $max] = explode('-', $range);
            return [(int) trim($min), (int) trim($max)];
        }

        return [(int) $range, (int) $range];
    }
}