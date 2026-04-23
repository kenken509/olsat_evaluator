<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('grade_rank_stanines', function (Blueprint $table) {
            $table->id();

            $table->unsignedTinyInteger('grade');
            $table->enum('type', ['total', 'verbal', 'nonverbal']);

            $table->unsignedTinyInteger('stanine');
            $table->unsignedTinyInteger('percentile_rank');

            $table->unsignedSmallInteger('min_scaled_score')->nullable();
            $table->unsignedSmallInteger('max_scaled_score')->nullable();

            $table->timestamps();

            $table->index(
                ['grade', 'type', 'stanine', 'percentile_rank'],
                'grade_rank_stanine_lookup_idx'
            );

            $table->unique(
                ['grade', 'type', 'percentile_rank'],
                'grade_rank_stanine_unique_idx'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grade_rank_stanines');
    }
};
