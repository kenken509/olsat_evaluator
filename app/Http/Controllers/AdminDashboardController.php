<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index()
    {

        return inertia('Admin/Dashboard/Index', [
            'header' => [
                'title' => 'Dashboard',
                'subtitle' => 'Overview of your system activity'
            ]
        ]);
    }
}
