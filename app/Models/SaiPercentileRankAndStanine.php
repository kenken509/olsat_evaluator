<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaiPercentileRankAndStanine extends Model
{
    protected $fillable = [
        'sai',
        'percentile_rank',
        'stanine',
    ];
}
