<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GradeRankStanine extends Model
{
    protected $fillable = [
        'grade',
        'type',
        'stanine',
        'percentile_rank',
        'min_scaled_score',
        'max_scaled_score',
    ];
}
