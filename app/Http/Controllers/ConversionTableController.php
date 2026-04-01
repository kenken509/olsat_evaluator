<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConversionTableController extends Controller
{
     public function index(){

       // $levelA = DB::table('raw_scaled_levels')->where('level', 'A')->first()->value;    
        return inertia('ConversionTable/Index');
    }

    public function getData(Request $request)
    {
        $level = $request->get('level', 'A'); // default A

        $data = DB::table('raw_scaled_levels')
            ->where('level', $level)
            ->get();

        return response()->json($data);
    }
}
