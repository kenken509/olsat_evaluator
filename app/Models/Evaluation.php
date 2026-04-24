<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    protected $guarded = [];

    protected $casts = [
        'birthdate' => 'date',
        'test_date' => 'date',
        'cluster_analysis' => 'array',
        'result_payload' => 'array',
    ];
}
