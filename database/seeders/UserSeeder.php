<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->updateOrInsert(
            ['email' => 'admin@example.com'],
            [
                'fname' => 'Aries',
                'lname' => 'LLesis',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'faculty@example.com'],
            [
                'fname' => 'Ken',
                'lname' => 'LLesis',
                'password' => Hash::make('password'),
                'role' => 'faculty',
                'is_active' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('users')->updateOrInsert(
            ['email' => 'evaluator@example.com'],
            [
                'fname' => 'Kenneth',
                'lname' => 'LLesis',
                'password' => Hash::make('password'),
                'role' => 'faculty',
                'is_active' => true,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
