<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    protected $guarded = [];

    protected $casts = [
        'test_date' => 'date',
        'birthdate' => 'date',
        'cluster_analysis' => 'array',
        'result_payload' => 'array',
    ];
}
