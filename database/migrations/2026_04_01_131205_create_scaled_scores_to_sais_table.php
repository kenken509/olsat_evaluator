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
        Schema::create('scaled_scores_to_sais', function (Blueprint $table) {
            $table->id();

            $table->unsignedTinyInteger('age'); // 🔥 NEW

            $table->unsignedTinyInteger('sai');

            $table->enum('type', ['total', 'verbal', 'nonverbal']);

            $table->unsignedTinyInteger('min_month');
            $table->unsignedTinyInteger('max_month');

            $table->unsignedSmallInteger('min_value');
            $table->unsignedSmallInteger('max_value');

            $table->timestamps();

            // 🚀 Lookup index
            $table->index([
                'age',
                'type',
                'min_month',
                'max_month',
                'min_value',
                'max_value'
            ], 'sai_lookup_idx');

            // 🔒 Prevent duplicates
            $table->unique([
                'age',
                'type',
                'sai',
                'min_month',
                'max_month'
            ], 'sai_unique_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scaled_scores_to_sais');
    }
};
