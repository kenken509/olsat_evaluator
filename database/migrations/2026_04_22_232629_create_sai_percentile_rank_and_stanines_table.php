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
        Schema::create('sai_percentile_rank_and_stanines', function (Blueprint $table) {
            $table->id();

            $table->unsignedSmallInteger('sai')->unique();
            $table->unsignedTinyInteger('percentile_rank');
            $table->unsignedTinyInteger('stanine');

            $table->timestamps();

            $table->index(['stanine', 'sai'], 'sai_stanine_lookup_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sai_percentile_rank_and_stanines');
    }
};
