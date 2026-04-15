<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConversionMatrixController extends Controller
{
    public function index()
    {
        return inertia('Admin/ConversionMatrix/Index', [
            'header' => [
                'title' => 'Conversion Matrix',
                'subtitle' => 'List of conversion matrix'
            ]
        ]);
    }
}
