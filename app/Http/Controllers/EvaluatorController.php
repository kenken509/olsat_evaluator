<?php

namespace App\Http\Controllers;

use App\Models\RawScaledLevel;
use App\Models\Student;
use Illuminate\Http\Request;

class EvaluatorController extends Controller
{
    public function index()
    {
        return inertia('Admin/Evaluator/Index', [
            'header' => [
                'title' => 'Evaluator',
                'subtitle' => 'Enter OLSAT raw scores to evaluate',
            ],
        ]);
    }

    public function evaluate(Request $request)
    {
        $validated = $request->validate([
            'student_name' => ['nullable', 'string', 'max:255'],
            'grade' => ['nullable', 'string', 'max:20'],
            'age_years' => ['nullable', 'integer', 'min:0', 'max:99'],
            'age_months' => ['nullable', 'integer', 'min:0', 'max:11'],
            'form' => ['nullable', 'string', 'max:20'],
            'level' => ['required', 'string', 'max:10'],
            'total' => ['required', 'integer', 'min:0'],
            'verbal' => ['required', 'integer', 'min:0'],
            'nonverbal' => ['required', 'integer', 'min:0'],
        ]);

        dd('im doing this');
        $scaledScoreTotal = RawScaledLevel::query()
            ->where('level', $validated['level'])
            ->where('type', 'total')
            ->where('raw_score', $validated['total'])
            ->first();

        $scaledScoreVerbal = RawScaledLevel::query()
            ->where('level', $validated['level'])
            ->where('type', 'verbal')
            ->where('raw_score', $validated['verbal'])
            ->first();

        $scaledScoreNonVerbal = RawScaledLevel::query()
            ->where('level', $validated['level'])
            ->where('type', 'nonverbal')
            ->where('raw_score', $validated['nonverbal'])
            ->first();

        if (! $scaledScoreTotal || ! $scaledScoreVerbal || ! $scaledScoreNonVerbal) {
            return response()->json([
                'message' => 'One or more score conversions were not found for the given level and raw scores.',
                'errors' => [
                    'lookup' => ['Please check the level and raw score values.'],
                ],
            ], 422);
        }

        return response()->json([
            'message' => 'Evaluation completed successfully.',
            'data' => [
                'student' => [
                    'student_name' => $validated['student_name'] ?? null,
                    'grade' => $validated['grade'] ?? null,
                    'age_years' => $validated['age_years'] ?? null,
                    'age_months' => $validated['age_months'] ?? null,
                    'form' => $validated['form'] ?? null,
                    'level' => $validated['level'],
                ],
                'total' => [
                    'raw_score' => (int) $validated['total'],
                    'scaled_score' => (int) $scaledScoreTotal->scaled_score,
                ],
                'verbal' => [
                    'raw_score' => (int) $validated['verbal'],
                    'scaled_score' => (int) $scaledScoreVerbal->scaled_score,
                ],
                'nonverbal' => [
                    'raw_score' => (int) $validated['nonverbal'],
                    'scaled_score' => (int) $scaledScoreNonVerbal->scaled_score,
                ],
            ],
        ]);
    }

    public function searchStudents(Request $request)
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string', 'max:255'],
        ]);

        $query = trim($validated['q'] ?? '');

        $students = Student::query()
            ->where('is_active', true)
            ->when($query !== '', function ($q) use ($query) {
                $q->where(function ($sub) use ($query) {
                    $sub->where('fname', 'like', "%{$query}%")
                        ->orWhere('mname', 'like', "%{$query}%")
                        ->orWhere('lname', 'like', "%{$query}%")
                        ->orWhere('student_id', 'like', "%{$query}%");
                });
            })
            ->orderBy('lname')
            ->orderBy('fname')
            ->limit(10)
            ->get([
                'id',
                'student_id',
                'fname',
                'mname',
                'lname',
                'birthdate',
                'incoming_grade_level',
            ])
            ->map(function ($student) {
                $fullName = collect([
                    $student->fname,
                    $student->mname,
                    $student->lname,
                ])->filter()->implode(' ');

                return [
                    'id' => $student->id,
                    'name' => $fullName,
                    'label' => $fullName . ' — Grade ' . $student->incoming_grade_level,
                    'grade' => $student->incoming_grade_level,
                    'birthdate' => $student->birthdate,
                    'student_id' => $student->student_id,
                ];
            })
            ->values();

        return response()->json($students);
    }

    public function testEvaluator()
    {
        return inertia('Evaluator/Form');
    }
}
