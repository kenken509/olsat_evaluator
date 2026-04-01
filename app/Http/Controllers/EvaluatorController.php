<?php

namespace App\Http\Controllers;

use App\Models\RawScaledLevel;
use Illuminate\Http\Request;

class EvaluatorController extends Controller
{
    public function index(){
        return inertia('Evaluator/Form');
    }

    public function evaluate(Request $request){

       

        $scaledScoreTotal = RawScaledLevel::where('level', $request->level)->where('type', 'total')->where('raw_score', $request->total)->first();

        $scaledScoreVerbal = RawScaledLevel::where('level', $request->level)->where('type', 'verbal')->where('raw_score', $request->verbal)->first();

        $scaledScoreNonVerbal = RawScaledLevel::where('level', $request->level)->where('type', 'nonverbal')->where('raw_score', $request->nonverbal)->first();

        //dd($scaledScoreTotal->scaled_score, $scaledScoreVerbal->scaled_score, $scaledScoreQuant->scaled_score);
        dd("Total: " . $scaledScoreTotal->scaled_score . " Verbal: " . $scaledScoreVerbal->scaled_score . " non-verbal: " . $scaledScoreNonVerbal->scaled_score); 
        //dd($scaledScoreNonVerbal->scaled_score); 
    }
}
