<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cluster_performance_categories', function (Blueprint $table) {
            $table->id();

            $table->unsignedTinyInteger('grade');

            $table->enum('cluster', [
                'total',
                'verbal',
                'verbal_comprehension',
                'verbal_reasoning',
                'nonverbal',
                'figural_reasoning',
                'quantitative_reasoning',
            ]);

            $table->unsignedTinyInteger('number_of_items');

            $table->unsignedTinyInteger('below_min')->nullable();
            $table->unsignedTinyInteger('below_max')->nullable();

            $table->unsignedTinyInteger('average_min')->nullable();
            $table->unsignedTinyInteger('average_max')->nullable();

            $table->unsignedTinyInteger('above_min')->nullable();
            $table->unsignedTinyInteger('above_max')->nullable();

            $table->timestamps();

            $table->index(
                ['grade', 'cluster'],
                'cluster_performance_grade_cluster_idx'
            );

            $table->unique(
                ['grade', 'cluster'],
                'cluster_performance_grade_cluster_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cluster_performance_categories');
    }
};
