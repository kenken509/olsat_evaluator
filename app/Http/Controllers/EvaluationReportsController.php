<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EvaluationReportsController extends Controller
{
    public function index()
    {
        return inertia('Admin/EvaluationReports/Index', [
            'header' => [
                'title' => 'Evaluation Reports',
                'subtitle' => 'List of evaluation reports',
            ],
        ]);
    }

    public function fetch(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'per_page' => ['nullable', 'integer', 'in:10,25,50,100'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $search = trim($validated['search'] ?? '');
        $perPage = (int) ($validated['per_page'] ?? 10);

        $evaluations = Evaluation::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($sub) use ($search) {
                    $sub->where('student_name', 'like', "%{$search}%")
                        ->orWhere('id', $search)
                        ->orWhere('level', 'like', "%{$search}%")
                        ->orWhere('form', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage);

        return response()->json([
            'data' => collect($evaluations->items())->map(function ($evaluation) {
                return [
                    'id' => $evaluation->id,
                    'student_name' => $evaluation->student_name,
                    'grade' => $evaluation->grade,
                    'age' => $evaluation->age_years . 'y / ' . $evaluation->age_months . 'm',
                    'level' => $evaluation->level,
                    'form' => $evaluation->form,
                    'test_date' => optional($evaluation->test_date)->format('F d, Y'),
                    'created_at' => $evaluation->created_at?->format('Y-m-d h:i A'),
                    'result_payload' => $evaluation->result_payload,
                ];
            })->values(),
            'meta' => [
                'current_page' => $evaluations->currentPage(),
                'last_page' => $evaluations->lastPage(),
                'per_page' => $evaluations->perPage(),
                'total' => $evaluations->total(),
                'from' => $evaluations->firstItem(),
                'to' => $evaluations->lastItem(),
            ],
        ]);
    }
}
