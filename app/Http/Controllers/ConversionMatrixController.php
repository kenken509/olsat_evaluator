<?php

namespace App\Http\Controllers;

use App\Models\RawScaledLevel;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\ScaledScoresToSai;
use App\Models\SaiPercentileRankAndStanine;
use App\Models\GradeRankStanine;
use App\Models\ClusterPerformanceCategory;


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

    public function ageRows(Request $request)
    {

        $validated = $request->validate([
            'age' => ['nullable', 'integer', 'in:8,9,10,11,12,13,14,15,16,17,18'],
            'per_page' => ['nullable', 'integer', 'in:5,10,20,50'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $age = $validated['age'] ?? 8;
        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? LengthAwarePaginator::resolveCurrentPage();

        $rows = ScaledScoresToSai::query()
            ->where('age', $age)
            ->orderByDesc('sai')
            ->get();

        $formatRange = function ($row) {
            if (! $row) {
                return null;
            }

            $minValue = (int) $row->min_value;
            $maxValue = (int) $row->max_value;

            $label = $minValue === 0
                ? 'Below ' . ($maxValue + 1)
                : ($maxValue === 9999
                    ? 'Above ' . ($minValue - 1)
                    : ($minValue === $maxValue
                        ? (string) $minValue
                        : "{$minValue} - {$maxValue}"));

            return [
                'min_value' => $minValue,
                'max_value' => $maxValue,
                'label' => $label,
            ];
        };

        $findRange = function ($items, $type, $minMonth, $maxMonth) use ($formatRange) {
            $row = $items->first(function ($item) use ($type, $minMonth, $maxMonth) {
                return $item->type === $type
                    && (int) $item->min_month === $minMonth
                    && (int) $item->max_month === $maxMonth;
            });

            return $formatRange($row);
        };

        $grouped = $rows
            ->groupBy('sai')
            ->map(function ($items, $sai) use ($findRange) {
                return [
                    'sai' => (int) $sai,

                    'total_0_2' => $findRange($items, 'total', 0, 2),
                    'total_3_5' => $findRange($items, 'total', 3, 5),
                    'total_6_8' => $findRange($items, 'total', 6, 8),
                    'total_9_11' => $findRange($items, 'total', 9, 11),

                    'verbal_0_2' => $findRange($items, 'verbal', 0, 2),
                    'verbal_3_5' => $findRange($items, 'verbal', 3, 5),
                    'verbal_6_8' => $findRange($items, 'verbal', 6, 8),
                    'verbal_9_11' => $findRange($items, 'verbal', 9, 11),

                    'nonverbal_0_2' => $findRange($items, 'nonverbal', 0, 2),
                    'nonverbal_3_5' => $findRange($items, 'nonverbal', 3, 5),
                    'nonverbal_6_8' => $findRange($items, 'nonverbal', 6, 8),
                    'nonverbal_9_11' => $findRange($items, 'nonverbal', 9, 11),
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

    public function saiRankStanineRows(Request $request)
    {
        $validated = $request->validate([
            'per_page' => ['nullable', 'integer', 'in:5,10,20,50'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? LengthAwarePaginator::resolveCurrentPage();

        $rows = SaiPercentileRankAndStanine::query()
            ->orderByDesc('sai')
            ->get()
            ->map(function ($row) {
                return [
                    'sai' => (int) $row->sai,
                    'label' => (int) $row->sai === 58 ? '58 and below' : (string) $row->sai,
                    'percentile_rank' => (int) $row->percentile_rank,
                    'stanine' => (int) $row->stanine,
                ];
            })
            ->values();

        $paginated = new LengthAwarePaginator(
            $rows->forPage($page, $perPage)->values(),
            $rows->count(),
            $perPage,
            $page,
            [
                'path' => $request->url(),
                'query' => $request->query(),
            ]
        );

        return response()->json($paginated);
    }

    public function gradeRankRows(Request $request)
    {
        $validated = $request->validate([
            'grade' => ['nullable', 'integer', 'in:4,5,6,7,8,9,10,11,12'],
            'per_page' => ['nullable', 'integer', 'in:5,10,20,50'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $grade = $validated['grade'] ?? 4;
        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? LengthAwarePaginator::resolveCurrentPage();

        $rows = GradeRankStanine::query()
            ->where('grade', $grade)
            ->orderByDesc('percentile_rank')
            ->orderByDesc('stanine')
            ->get();

        $formatRange = function ($row) {
            if (! $row || $row->min_scaled_score === null || $row->max_scaled_score === null) {
                return null;
            }

            $minValue = (int) $row->min_scaled_score;
            $maxValue = (int) $row->max_scaled_score;

            $label = $minValue === 0
                ? 'Below ' . ($maxValue + 1)
                : ($maxValue === 9999
                    ? 'Above ' . ($minValue - 1)
                    : ($minValue === $maxValue
                        ? (string) $minValue
                        : "{$minValue} - {$maxValue}"));

            return [
                'min_value' => $minValue,
                'max_value' => $maxValue,
                'label' => $label,
            ];
        };

        $findCell = function ($items, $type) use ($formatRange) {
            $row = $items->firstWhere('type', $type);
            return $formatRange($row);
        };

        $grouped = $rows
            ->groupBy(function ($row) {
                return $row->stanine . ':' . $row->percentile_rank;
            })
            ->map(function ($items) use ($findCell) {
                $first = $items->first();

                return [
                    'stanine' => (int) $first->stanine,
                    'percentile_rank' => (int) $first->percentile_rank,
                    'total' => $findCell($items, 'total'),
                    'verbal' => $findCell($items, 'verbal'),
                    'nonverbal' => $findCell($items, 'nonverbal'),
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

    public function clusterPerformanceRows(Request $request)
    {
        $validated = $request->validate([
            'grade' => ['nullable', 'integer', 'in:4,5,6,7,8,9,10,11,12'],
            'per_page' => ['nullable', 'integer', 'in:5,10,20,50'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $grade = $validated['grade'] ?? 4;
        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? LengthAwarePaginator::resolveCurrentPage();

        $labelRange = function ($min, $max) {
            if ($min === null || $max === null) {
                return '—';
            }

            if ((int) $min === (int) $max) {
                return (string) $min;
            }

            return "{$min} - {$max}";
        };

        $rows = ClusterPerformanceCategory::query()
            ->where('grade', $grade)
            ->get()
            ->map(function ($row) use ($labelRange) {
                return [
                    'cluster' => $row->cluster,
                    'cluster_label' => match ($row->cluster) {
                        'total' => 'Total',
                        'verbal' => 'Verbal',
                        'verbal_comprehension' => 'Verbal Comprehension',
                        'verbal_reasoning' => 'Verbal Reasoning',
                        'nonverbal' => 'Nonverbal',
                        'figural_reasoning' => 'Figural Reasoning',
                        'quantitative_reasoning' => 'Quantitative Reasoning',
                        default => ucfirst(str_replace('_', ' ', $row->cluster)),
                    },
                    'number_of_items' => (int) $row->number_of_items,
                    'below_average' => $labelRange($row->below_min, $row->below_max),
                    'average' => $labelRange($row->average_min, $row->average_max),
                    'above_average' => $labelRange($row->above_min, $row->above_max),
                ];
            })
            ->values();

        $paginated = new LengthAwarePaginator(
            $rows->forPage($page, $perPage)->values(),
            $rows->count(),
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
