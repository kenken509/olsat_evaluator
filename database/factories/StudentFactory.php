<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        $year = now()->year;

        $schools = [
            'Aguinaldo National High School',
            'Amadeo Integrated School',
            'Anabu Elementary School',
            'Bacoor City National High School',
            'Bagbag National High School',
            'Bailen Integrated School',
            'Bucal Elementary School',
            'Carmona National High School',
            'Cavite City High School',
            'Cavite East National High School',
            'City of Dasmarinas Integrated School',
            'Dasmarinas North National High School',
            'Dasmarinas South Central School',
            'General Emilio Aguinaldo National High School',
            'General Mariano Alvarez Central Elementary School',
            'Gen. Trias National High School',
            'Governor Ferrer Memorial Integrated School',
            'Imus National High School',
            'Indang Central Elementary School',
            'Indang National High School',
            'Kaybagal National High School',
            'Kawit Central School',
            'Lancaster New City Integrated School',
            'Manggahan National High School',
            'Maragondon National High School',
            'Molino Elementary School',
            'Molino National High School',
            'Naic Coastal Integrated National High School',
            'Naic Elementary School',
            'Noveleta National High School',
            'Paliparan Integrated School',
            'Palliparan National High School',
            'Perez Dasmarinas Memorial High School',
            'Rosario National High School',
            'Salawag National High School',
            'San Gabriel Elementary School',
            'San Jose Community High School',
            'San Marino Integrated School',
            'San Nicolas National High School',
            'Silang Central Elementary School',
            'Silang National High School',
            'St. Dominic Academy of Cavite',
            'St. Francis Learning Center of Cavite',
            'Tagaytay City National High School',
            'Tanza Coastal National High School',
            'Tanza National Comprehensive High School',
            'Trece Martires City National High School',
            'Trece Martires West Elementary School',
            'Tropical Village National High School',
            'West Governor Hills Integrated School',
        ];

        return [
            'student_id' => $year . '-' . str_pad((string) fake()->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT),
            'fname' => fake()->firstName(),
            'mname' => fake()->optional()->firstName(),
            'lname' => fake()->lastName(),
            'sex' => fake()->randomElement(['Male', 'Female']),
            'birthdate' => fake()->dateTimeBetween('-18 years', '-5 years')->format('Y-m-d'),
            'incoming_grade_level' => fake()->numberBetween(1, 12),
            'previous_school' => fake()->optional(0.85)->randomElement($schools),
            'is_active' => fake()->boolean(90),
        ];
    }
}
