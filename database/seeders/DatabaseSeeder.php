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
use Database\Seeders\Age13TotalSeeder;
use Database\Seeders\RawScaledLevelASeeder;
use Database\Seeders\RawScaledLevelBseeder;
use Database\Seeders\RawScaledLevelCSeeder;
use Database\Seeders\RawScaledLevelDSeeder;
use Database\Seeders\RawScaledLevelESeeder;
use Database\Seeders\RawScaledLevelFSeeder;
use Database\Seeders\RawScaledLevelGSeeder;
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
        ]);
    }
}
