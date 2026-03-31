<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EvaluatorController extends Controller
{
    public function index(){
        return inertia('Evaluator/Form');
    }
}
