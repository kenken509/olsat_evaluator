<?php

namespace Database\Seeders;

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
        ]);
    }
}
