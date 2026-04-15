<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConversionMatrixController extends Controller
{
    public function index()
    {
        return inertia('Admin/ConversionMatrix/Index', [
            'header' => [
                'title' => 'OLSAT Spring  Norms',
                'subtitle' => ' Manage score conversion references by category, subgroup, and interpretation.'

            ]
        ]);
    }
}
