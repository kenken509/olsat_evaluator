<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_id')->nullable()->constrained('students')->nullOnDelete();
            $table->foreignId('evaluator_id')->nullable()->constrained('users')->nullOnDelete();

            $table->string('student_name');
            $table->unsignedTinyInteger('grade');
            $table->date('birthdate')->nullable();
            $table->date('test_date');

            $table->unsignedTinyInteger('age_years');
            $table->unsignedTinyInteger('age_months');

            $table->string('form', 20)->nullable();
            $table->enum('level', ['A', 'B', 'C', 'D', 'E', 'F', 'G']);

            // raw scores
            $table->unsignedSmallInteger('raw_total');
            $table->unsignedSmallInteger('raw_verbal');
            $table->unsignedSmallInteger('raw_verbal_comprehension');
            $table->unsignedSmallInteger('raw_verbal_reasoning');
            $table->unsignedSmallInteger('raw_nonverbal');
            $table->unsignedSmallInteger('raw_figural_reasoning');
            $table->unsignedSmallInteger('raw_quantitative_reasoning');

            // scaled scores
            $table->unsignedSmallInteger('scaled_total');
            $table->unsignedSmallInteger('scaled_verbal');
            $table->unsignedSmallInteger('scaled_nonverbal');

            // performance by age
            $table->unsignedSmallInteger('age_sai_total');
            $table->unsignedSmallInteger('age_sai_verbal');
            $table->unsignedSmallInteger('age_sai_nonverbal');

            $table->unsignedTinyInteger('age_percentile_total');
            $table->unsignedTinyInteger('age_percentile_verbal');
            $table->unsignedTinyInteger('age_percentile_nonverbal');

            $table->unsignedTinyInteger('age_stanine_total');
            $table->unsignedTinyInteger('age_stanine_verbal');
            $table->unsignedTinyInteger('age_stanine_nonverbal');

            // performance by grade
            $table->unsignedTinyInteger('grade_percentile_total');
            $table->unsignedTinyInteger('grade_percentile_verbal');
            $table->unsignedTinyInteger('grade_percentile_nonverbal');

            $table->unsignedTinyInteger('grade_stanine_total');
            $table->unsignedTinyInteger('grade_stanine_verbal');
            $table->unsignedTinyInteger('grade_stanine_nonverbal');

            // full computed snapshot
            $table->json('cluster_analysis')->nullable();
            $table->json('result_payload')->nullable();

            $table->timestamps();

            $table->index(['test_date', 'level']);
            $table->index(['student_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
