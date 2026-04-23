<?php

namespace Database\Seeders;

use Database\Seeders\Age8NonVerbalSeeder;
use Database\Seeders\Age8TotalSeeder;
use Database\Seeders\Age8verbalSeeder;
use Database\Seeders\Age9NonVerbalSeeder;
use Database\Seeders\Age9TotalSeeder;
use Database\Seeders\Age9verbalSeeder;
use Database\Seeders\Age10NonVerbalSeeder;
use Database\Seeders\Age10TotalSeeder;
use Database\Seeders\Age10VerbalSeeder;
use Database\Seeders\Age11NonVerbalSeeder;
use Database\Seeders\Age11TotalSeeder;
use Database\Seeders\Age11VerbalSeeder;
use Database\Seeders\Age12NonVerbalSeeder;
use Database\Seeders\Age12TotalSeeder;
use Database\Seeders\Age12VerbalSeeder;
use Database\Seeders\Age13NonVerbalSeeder;
use Database\Seeders\Age13TotalSeeder;
use Database\Seeders\Age13VerbalSeeder;
use Database\Seeders\Age14NonVerbalSeeder;
use Database\Seeders\Age14TotalSeeder;
use Database\Seeders\Age14VerbalSeeder;
use Database\Seeders\Age15NonVerbalSeeder;
use Database\Seeders\Age15TotalSeeder;
use Database\Seeders\Age15VerbalSeeder;
use Database\Seeders\Age16NonVerbalSeeder;
use Database\Seeders\Age16TotalSeeder;
use Database\Seeders\Age16VerbalSeeder;
use Database\Seeders\Age17NonVerbalSeeder;
use Database\Seeders\Age17TotalSeeder;
use Database\Seeders\Age17VerbalSeeder;
use Database\Seeders\Age18NonVerbalSeeder;
use Database\Seeders\Age18TotalSeeder;
use Database\Seeders\Age18VerbalSeeder;
use Database\Seeders\Grade4ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade4GradeRankStanineSeeder;
use Database\Seeders\Grade5ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade5GradeRankStanineSeeder;
use Database\Seeders\Grade6ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade6GradeRankStanineSeeder;
use Database\Seeders\Grade7ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade7GradeRankStanineSeeder;
use Database\Seeders\Grade8ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade8GradeRankStanineSeeder;
use Database\Seeders\Grade9ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade9GradeRankStanineSeeder;
use Database\Seeders\Grade10ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade10GradeRankStanineSeeder;
use Database\Seeders\Grade11ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade11GradeRankStanineSeeder;
use Database\Seeders\Grade12ClusterPerformanceCategorySeeder;
use Database\Seeders\Grade12GradeRankStanineSeeder;
use Database\Seeders\RawScaledLevelASeeder;
use Database\Seeders\RawScaledLevelBseeder;
use Database\Seeders\RawScaledLevelCSeeder;
use Database\Seeders\RawScaledLevelDSeeder;
use Database\Seeders\RawScaledLevelESeeder;
use Database\Seeders\RawScaledLevelFSeeder;
use Database\Seeders\RawScaledLevelGSeeder;
use Database\Seeders\SaiPercentileRankStanineSeeder;
use Database\Seeders\StudentSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            UserSeeder::class,
            RawScaledLevelASeeder::class,
            RawScaledLevelBseeder::class,
            RawScaledLevelCSeeder::class,
            RawScaledLevelDSeeder::class,
            RawScaledLevelESeeder::class,
            RawScaledLevelFSeeder::class,
            RawScaledLevelGSeeder::class,
            Age8TotalSeeder::class,
            Age8verbalSeeder::class,
            Age8NonVerbalSeeder::class,
            Age9TotalSeeder::class,
            Age9verbalSeeder::class,
            Age9NonVerbalSeeder::class,
            Age10TotalSeeder::class,
            Age10VerbalSeeder::class,
            Age10NonVerbalSeeder::class,
            Age11TotalSeeder::class,
            Age11VerbalSeeder::class,
            Age11NonVerbalSeeder::class,
            Age12TotalSeeder::class,
            Age12VerbalSeeder::class,
            Age12NonVerbalSeeder::class,
            Age13TotalSeeder::class,
            Age13VerbalSeeder::class,
            Age13NonVerbalSeeder::class,
            Age14NonVerbalSeeder::class,
            Age14TotalSeeder::class,
            Age14VerbalSeeder::class,
            Age15TotalSeeder::class,
            Age15VerbalSeeder::class,
            Age15NonVerbalSeeder::class,
            Age16TotalSeeder::class,
            Age16VerbalSeeder::class,
            Age16NonVerbalSeeder::class,
            Age17TotalSeeder::class,
            Age17VerbalSeeder::class,
            Age17NonVerbalSeeder::class,
            Age18TotalSeeder::class,
            Age18VerbalSeeder::class,
            Age18NonVerbalSeeder::class,
            StudentSeeder::class,
            SaiPercentileRankStanineSeeder::class,
            Grade4GradeRankStanineSeeder::class,
            Grade5GradeRankStanineSeeder::class,
            Grade6GradeRankStanineSeeder::class,
            Grade7GradeRankStanineSeeder::class,
            Grade8GradeRankStanineSeeder::class,
            Grade9GradeRankStanineSeeder::class,
            Grade10GradeRankStanineSeeder::class,
            Grade11GradeRankStanineSeeder::class,
            Grade12GradeRankStanineSeeder::class,
            Grade4ClusterPerformanceCategorySeeder::class,
            Grade5ClusterPerformanceCategorySeeder::class,
            Grade6ClusterPerformanceCategorySeeder::class,
            Grade7ClusterPerformanceCategorySeeder::class,
            Grade8ClusterPerformanceCategorySeeder::class,
            Grade9ClusterPerformanceCategorySeeder::class,
            Grade10ClusterPerformanceCategorySeeder::class,
            Grade11ClusterPerformanceCategorySeeder::class,
            Grade12ClusterPerformanceCategorySeeder::class,
        ]);
    }
}
