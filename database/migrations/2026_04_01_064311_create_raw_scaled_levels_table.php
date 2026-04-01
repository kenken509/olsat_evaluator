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
        Schema::create('raw_scaled_levels', function (Blueprint $table) {
             $table->id();

            $table->enum('level', ['A','B','C','D','E','F','G']); 
            $table->enum('type', ['total','verbal','nonverbal']);

            $table->integer('raw_score');
            $table->integer('scaled_score');

            $table->timestamps();

            $table->unique(['level', 'type', 'raw_score']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raw_scaled_levels');
    }
};
