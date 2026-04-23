<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClusterPerformanceCategory extends Model
{
    protected $fillable = [
        'grade',
        'cluster',
        'number_of_items',
        'below_min',
        'below_max',
        'average_min',
        'average_max',
        'above_min',
        'above_max',
    ];
}
