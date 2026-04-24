<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

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

    public function evaluate(Request $request): JsonResponse
    {
        [$validated, $student] = $this->validateEvaluationInput($request);

        $result = DB::transaction(function () use ($validated, $student) {
            $computed = $this->buildEvaluationResult($validated, $student);

            $evaluation = Evaluation::create([
                'student_id' => $student?->id,
                'evaluator_id' => Auth::id(),

                'student_name' => $computed['student']['student_name'],
                'grade' => $computed['student']['grade'],
                'birthdate' => $student?->birthdate,
                'test_date' => $validated['test_date'],
                'age_years' => $computed['student']['age_years'],
                'age_months' => $computed['student']['age_months'],
                'form' => $computed['student']['form'],
                'level' => $computed['student']['level'],

                'raw_total' => $computed['raw_scores']['total'],
                'raw_verbal' => $computed['raw_scores']['verbal'],
                'raw_verbal_comprehension' => $computed['raw_scores']['verbal_comprehension'],
                'raw_verbal_reasoning' => $computed['raw_scores']['verbal_reasoning'],
                'raw_nonverbal' => $computed['raw_scores']['nonverbal'],
                'raw_figural_reasoning' => $computed['raw_scores']['figural_reasoning'],
                'raw_quantitative_reasoning' => $computed['raw_scores']['quantitative_reasoning'],

                'scaled_total' => $computed['scaled_scores']['total'],
                'scaled_verbal' => $computed['scaled_scores']['verbal'],
                'scaled_nonverbal' => $computed['scaled_scores']['nonverbal'],

                'age_sai_total' => $computed['performance_by_age']['sai']['total'],
                'age_sai_verbal' => $computed['performance_by_age']['sai']['verbal'],
                'age_sai_nonverbal' => $computed['performance_by_age']['sai']['nonverbal'],

                'age_percentile_total' => $computed['performance_by_age']['percentile_rank']['total'],
                'age_percentile_verbal' => $computed['performance_by_age']['percentile_rank']['verbal'],
                'age_percentile_nonverbal' => $computed['performance_by_age']['percentile_rank']['nonverbal'],

                'age_stanine_total' => $computed['performance_by_age']['stanine']['total'],
                'age_stanine_verbal' => $computed['performance_by_age']['stanine']['verbal'],
                'age_stanine_nonverbal' => $computed['performance_by_age']['stanine']['nonverbal'],

                'grade_percentile_total' => $computed['performance_by_grade']['percentile_rank']['total'],
                'grade_percentile_verbal' => $computed['performance_by_grade']['percentile_rank']['verbal'],
                'grade_percentile_nonverbal' => $computed['performance_by_grade']['percentile_rank']['nonverbal'],

                'grade_stanine_total' => $computed['performance_by_grade']['stanine']['total'],
                'grade_stanine_verbal' => $computed['performance_by_grade']['stanine']['verbal'],
                'grade_stanine_nonverbal' => $computed['performance_by_grade']['stanine']['nonverbal'],

                'cluster_analysis' => $computed['cluster_analysis'],
                'result_payload' => $computed,
            ]);

            $computed['evaluation_id'] = $evaluation->id;

            return $computed;
        });

        return response()->json([
            'message' => 'Evaluation completed and saved successfully.',
            'evaluation_id' => $result['evaluation_id'],
            'data' => $result,
        ]);
    }

    public function searchStudents(Request $request): JsonResponse
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

    protected function validateEvaluationInput(Request $request): array
    {
        $validated = $request->validate([
            'student_id' => ['nullable', 'exists:students,id'],
            'student_name' => ['nullable', 'string', 'max:255'],

            'grade' => ['required', 'integer', 'min:1', 'max:12'],
            'age_years' => ['required', 'integer', 'min:0', 'max:99'],
            'age_months' => ['required', 'integer', 'min:0', 'max:11'],

            'test_date' => ['required', 'date'],
            'form' => ['required', 'string', 'max:20'],
            'level' => ['required', 'string', 'max:10'],

            'total' => ['required', 'integer', 'min:0'],
            'verbal' => ['required', 'integer', 'min:0'],
            'verbal_comprehension' => ['required', 'integer', 'min:0'],
            'verbal_reasoning' => ['required', 'integer', 'min:0'],
            'nonverbal' => ['required', 'integer', 'min:0'],
            'nonverbal_figural_reasoning' => ['required', 'integer', 'min:0'],
            'nonverbal_quantitative_reasoning' => ['required', 'integer', 'min:0'],
        ]);

        if ((int) $validated['verbal'] !== ((int) $validated['verbal_comprehension'] + (int) $validated['verbal_reasoning'])) {
            throw ValidationException::withMessages([
                'verbal' => ['Verbal must equal Verbal Comprehension + Verbal Reasoning.'],
            ]);
        }

        if ((int) $validated['nonverbal'] !== ((int) $validated['nonverbal_figural_reasoning'] + (int) $validated['nonverbal_quantitative_reasoning'])) {
            throw ValidationException::withMessages([
                'nonverbal' => ['Nonverbal must equal Figural Reasoning + Quantitative Reasoning.'],
            ]);
        }

        if ((int) $validated['total'] !== ((int) $validated['verbal'] + (int) $validated['nonverbal'])) {
            throw ValidationException::withMessages([
                'total' => ['Total must equal Verbal + Nonverbal.'],
            ]);
        }

        $student = !empty($validated['student_id'])
            ? Student::find($validated['student_id'])
            : null;

        return [$validated, $student];
    }

    protected function buildEvaluationResult(array $validated, ?Student $student): array
    {
        $rawScaledTotal = $this->getScaledScore($validated['level'], 'total', (int) $validated['total']);
        $rawScaledVerbal = $this->getScaledScore($validated['level'], 'verbal', (int) $validated['verbal']);
        $rawScaledNonVerbal = $this->getScaledScore($validated['level'], 'nonverbal', (int) $validated['nonverbal']);

        $ageSaiTotal = $this->getAgeSai('total', (int) $validated['age_years'], (int) $validated['age_months'], $rawScaledTotal);
        $ageSaiVerbal = $this->getAgeSai('verbal', (int) $validated['age_years'], (int) $validated['age_months'], $rawScaledVerbal);
        $ageSaiNonVerbal = $this->getAgeSai('nonverbal', (int) $validated['age_years'], (int) $validated['age_months'], $rawScaledNonVerbal);

        $saiTotalRankRow = $this->getSaiRankRow($ageSaiTotal);
        $saiVerbalRankRow = $this->getSaiRankRow($ageSaiVerbal);
        $saiNonVerbalRankRow = $this->getSaiRankRow($ageSaiNonVerbal);

        $gradeTotalRankRow = $this->getGradeRankRow((int) $validated['grade'], 'total', $rawScaledTotal);
        $gradeVerbalRankRow = $this->getGradeRankRow((int) $validated['grade'], 'verbal', $rawScaledVerbal);
        $gradeNonVerbalRankRow = $this->getGradeRankRow((int) $validated['grade'], 'nonverbal', $rawScaledNonVerbal);

        $clusterAnalysis = [
            'total' => $this->getClusterCategory((int) $validated['grade'], 'total', (int) $validated['total']),
            'verbal' => $this->getClusterCategory((int) $validated['grade'], 'verbal', (int) $validated['verbal']),
            'verbal_comprehension' => $this->getClusterCategory((int) $validated['grade'], 'verbal_comprehension', (int) $validated['verbal_comprehension']),
            'verbal_reasoning' => $this->getClusterCategory((int) $validated['grade'], 'verbal_reasoning', (int) $validated['verbal_reasoning']),
            'nonverbal' => $this->getClusterCategory((int) $validated['grade'], 'nonverbal', (int) $validated['nonverbal']),
            'figural_reasoning' => $this->getClusterCategory((int) $validated['grade'], 'figural_reasoning', (int) $validated['nonverbal_figural_reasoning']),
            'quantitative_reasoning' => $this->getClusterCategory((int) $validated['grade'], 'quantitative_reasoning', (int) $validated['nonverbal_quantitative_reasoning']),
        ];

        return [
            'student' => [
                'student_id' => $student?->student_id,
                'student_name' => $validated['student_name'] ?: $this->resolveStudentName($student),
                'grade' => (int) $validated['grade'],
                'age_years' => (int) $validated['age_years'],
                'age_months' => (int) $validated['age_months'],
                'form' => $validated['form'],
                'level' => $validated['level'],
            ],

            'raw_scores' => [
                'total' => (int) $validated['total'],
                'verbal' => (int) $validated['verbal'],
                'verbal_comprehension' => (int) $validated['verbal_comprehension'],
                'verbal_reasoning' => (int) $validated['verbal_reasoning'],
                'nonverbal' => (int) $validated['nonverbal'],
                'figural_reasoning' => (int) $validated['nonverbal_figural_reasoning'],
                'quantitative_reasoning' => (int) $validated['nonverbal_quantitative_reasoning'],
            ],

            'scaled_scores' => [
                'total' => $rawScaledTotal,
                'verbal' => $rawScaledVerbal,
                'nonverbal' => $rawScaledNonVerbal,
            ],

            'performance_by_age' => [
                'sai' => [
                    'total' => $ageSaiTotal,
                    'verbal' => $ageSaiVerbal,
                    'nonverbal' => $ageSaiNonVerbal,
                ],
                'percentile_rank' => [
                    'total' => (int) $saiTotalRankRow->percentile_rank,
                    'verbal' => (int) $saiVerbalRankRow->percentile_rank,
                    'nonverbal' => (int) $saiNonVerbalRankRow->percentile_rank,
                ],
                'stanine' => [
                    'total' => (int) $saiTotalRankRow->stanine,
                    'verbal' => (int) $saiVerbalRankRow->stanine,
                    'nonverbal' => (int) $saiNonVerbalRankRow->stanine,
                ],
            ],

            'performance_by_grade' => [
                'percentile_rank' => [
                    'total' => (int) $gradeTotalRankRow->percentile_rank,
                    'verbal' => (int) $gradeVerbalRankRow->percentile_rank,
                    'nonverbal' => (int) $gradeNonVerbalRankRow->percentile_rank,
                ],
                'stanine' => [
                    'total' => (int) $gradeTotalRankRow->stanine,
                    'verbal' => (int) $gradeVerbalRankRow->stanine,
                    'nonverbal' => (int) $gradeNonVerbalRankRow->stanine,
                ],
            ],

            'cluster_analysis' => $clusterAnalysis,
        ];
    }

    protected function resolveStudentName(?Student $student): ?string
    {
        if (! $student) {
            return null;
        }

        return collect([$student->fname, $student->mname, $student->lname])
            ->filter()
            ->implode(' ');
    }

    protected function getScaledScore(string $level, string $type, int $rawScore): int
    {
        $scaled = DB::table('raw_scaled_levels')
            ->where('level', $level)
            ->where('type', $type)
            ->where('raw_score', $rawScore)
            ->value('scaled_score');

        if ($scaled === null) {
            throw ValidationException::withMessages([
                'lookup' => ["No scaled score found for {$type} raw score {$rawScore} at level {$level}."],
            ]);
        }

        return (int) $scaled;
    }

    protected function getAgeSai(string $type, int $ageYears, int $ageMonths, int $scaledScore): int
    {
        $sai = DB::table('scaled_scores_to_sais')
            ->where('age', $ageYears)
            ->where('type', $type)
            ->where('min_month', '<=', $ageMonths)
            ->where('max_month', '>=', $ageMonths)
            ->where('min_value', '<=', $scaledScore)
            ->where('max_value', '>=', $scaledScore)
            ->value('sai');

        if ($sai === null) {
            throw ValidationException::withMessages([
                'lookup' => ["No SAI found for {$type}, scaled score {$scaledScore}, age {$ageYears}/{$ageMonths}."],
            ]);
        }

        return (int) $sai;
    }

    protected function getSaiRankRow(int $sai): object
    {
        $row = DB::table('sai_percentile_rank_and_stanines')
            ->where('sai', $sai)
            ->first();

        if (! $row) {
            throw ValidationException::withMessages([
                'lookup' => ["No percentile rank / stanine found for SAI {$sai}."],
            ]);
        }

        return $row;
    }

    protected function getGradeRankRow(int $grade, string $type, int $scaledScore): object
    {
        $row = DB::table('grade_rank_stanines')
            ->where('grade', $grade)
            ->where('type', $type)
            ->where(function ($query) use ($scaledScore) {
                $query->whereNull('min_scaled_score')
                    ->orWhere('min_scaled_score', '<=', $scaledScore);
            })
            ->where(function ($query) use ($scaledScore) {
                $query->whereNull('max_scaled_score')
                    ->orWhere('max_scaled_score', '>=', $scaledScore);
            })
            ->first();

        if (! $row) {
            throw ValidationException::withMessages([
                'lookup' => ["No grade rank/stanine found for grade {$grade}, {$type}, scaled score {$scaledScore}."],
            ]);
        }

        return $row;
    }

    protected function getClusterCategory(int $grade, string $cluster, int $rawScore): array
    {
        $row = DB::table('cluster_performance_categories')
            ->where('grade', $grade)
            ->where('cluster', $cluster)
            ->first();

        if (! $row) {
            throw ValidationException::withMessages([
                'lookup' => ["No cluster performance row found for grade {$grade}, cluster {$cluster}."],
            ]);
        }

        $category = null;

        if ($row->below_min !== null && $row->below_max !== null && $rawScore >= $row->below_min && $rawScore <= $row->below_max) {
            $category = 'below_average';
        } elseif ($row->average_min !== null && $row->average_max !== null && $rawScore >= $row->average_min && $rawScore <= $row->average_max) {
            $category = 'average';
        } elseif ($row->above_min !== null && $row->above_max !== null && $rawScore >= $row->above_min && $rawScore <= $row->above_max) {
            $category = 'above_average';
        }

        return [
            'number_of_items' => (int) $row->number_of_items,
            'number_right' => $rawScore,
            'category' => $category,
            'below_average' => $category === 'below_average' ? $rawScore : null,
            'average' => $category === 'average' ? $rawScore : null,
            'above_average' => $category === 'above_average' ? $rawScore : null,
        ];
    }
}
