<?php

namespace App\Http\Controllers;

use App\Models\RawScaledLevel;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ConversionMatrixController extends Controller
{
    public function index()
    {
        return inertia('Admin/ConversionMatrix/Index', [
            'header' => [
                'title' => 'Conversion Matrix',
                'subtitle' => 'Manage score conversion references',
            ],
        ]);
    }

    public function levelRows(Request $request)
    {

        $validated = $request->validate([
            'level' => ['nullable', 'string', 'in:A,B,C,D,E,F,G'],
            'per_page' => ['nullable', 'integer', 'in:5,10,20,50'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $level = $validated['level'] ?? 'E';
        $perPage = $validated['per_page'] ?? 50;
        $page = $validated['page'] ?? LengthAwarePaginator::resolveCurrentPage();

        $rows = RawScaledLevel::query()
            ->where('level', $level)
            ->orderByDesc('raw_score')
            ->get();

        $grouped = $rows
            ->groupBy('raw_score')
            ->map(function ($items, $rawScore) {
                $total = $items->firstWhere('type', 'total');
                $verbal = $items->firstWhere('type', 'verbal');
                $nonverbal = $items->firstWhere('type', 'nonverbal');

                return [
                    'raw_score' => (int) $rawScore,
                    'total_scaled' => $total?->scaled_score,
                    'verbal_scaled' => $verbal?->scaled_score,
                    'nonverbal_scaled' => $nonverbal?->scaled_score,
                ];
            })
            ->values();

        $paginated = new LengthAwarePaginator(
            $grouped->forPage($page, $perPage)->values(),
            $grouped->count(),
            $perPage,
            $page,
            [
                'path' => $request->url(),
                'query' => $request->query(),
            ]
        );

        return response()->json($paginated);
    }
}
