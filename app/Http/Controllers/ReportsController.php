<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function index()
    {
        return inertia('Admin/Reports/Index', [
            'header' => [
                'title' => 'Reports',
                'subtitle' => 'List of reports',
            ],
        ]);
    }
}
