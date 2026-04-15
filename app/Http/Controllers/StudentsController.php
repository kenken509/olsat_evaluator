<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class StudentsController extends Controller
{
    public function index()
    {
        return inertia('Admin/Students/Index', [
            'header' => [
                'title' => 'Students',
                'subtitle' => 'List of students',
            ],
        ]);
    }

    public function allStudents(Request $request)
    {
        $query = trim((string) $request->get('q', ''));
        $perPage = (int) $request->get('per_page', 10);
        $view = $request->get('view', 'active');

        $perPage = in_array($perPage, [10, 20, 30, 50], true) ? $perPage : 10;

        $students = Student::query()
            ->when($view === 'archived', function ($q) {
                $q->onlyTrashed();
            }, function ($q) {
                $q->whereNull('deleted_at');
            })
            ->when($query !== '', function ($q) use ($query) {
                $q->where(function ($inner) use ($query) {
                    $inner->where('student_id', 'like', "%{$query}%")
                        ->orWhere('fname', 'like', "%{$query}%")
                        ->orWhere('mname', 'like', "%{$query}%")
                        ->orWhere('lname', 'like', "%{$query}%")
                        ->orWhere('previous_school', 'like', "%{$query}%");
                });
            })
            ->orderBy('lname')
            ->orderBy('fname')
            ->paginate($perPage)
            ->withQueryString();

        return response()->json($students);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'string', 'max:255', 'unique:students,student_id'],
            'fname' => ['required', 'string', 'max:255'],
            'mname' => ['nullable', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'sex' => ['required', Rule::in(['Male', 'Female'])],
            'birthdate' => ['nullable', 'date'],
            'incoming_grade_level' => ['required', 'integer', 'between:1,12'],
            'previous_school' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        DB::beginTransaction();

        try {
            $student = Student::create([
                'student_id' => $validated['student_id'],
                'fname' => $validated['fname'],
                'mname' => $validated['mname'] ?? null,
                'lname' => $validated['lname'],
                'sex' => $validated['sex'],
                'birthdate' => $validated['birthdate'] ?? null,
                'incoming_grade_level' => $validated['incoming_grade_level'],
                'previous_school' => $validated['previous_school'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
            ]);

            AuditLog::create([
                'actor_id' => Auth::id(),
                'module' => 'students',
                'action' => 'create',
                'subject_id' => $student->id,
                'subject_type' => Student::class,
                'description' => "Created student #{$student->id}: {$student->fname} {$student->lname}",
                'old_values' => null,
                'new_values' => json_encode($student->only([
                    'student_id',
                    'fname',
                    'mname',
                    'lname',
                    'sex',
                    'birthdate',
                    'incoming_grade_level',
                    'previous_school',
                    'is_active',
                ])),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Student created successfully.',
                'student' => $student,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Failed to create student.', [
                'error' => $e->getMessage(),
                'auth_user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'Failed to create student. Please try again.',
            ], 500);
        }
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'student_id' => [
                'required',
                'string',
                'max:255',
                Rule::unique('students', 'student_id')->ignore($student->id),
            ],
            'fname' => ['required', 'string', 'max:255'],
            'mname' => ['nullable', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'sex' => ['required', Rule::in(['Male', 'Female'])],
            'birthdate' => ['nullable', 'date'],
            'incoming_grade_level' => ['required', 'integer', 'between:1,12'],
            'previous_school' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        DB::beginTransaction();

        try {
            $oldValues = $student->only([
                'student_id',
                'fname',
                'mname',
                'lname',
                'sex',
                'birthdate',
                'incoming_grade_level',
                'previous_school',
                'is_active',
            ]);

            $student->update([
                'student_id' => $validated['student_id'],
                'fname' => $validated['fname'],
                'mname' => $validated['mname'] ?? null,
                'lname' => $validated['lname'],
                'sex' => $validated['sex'],
                'birthdate' => $validated['birthdate'] ?? null,
                'incoming_grade_level' => $validated['incoming_grade_level'],
                'previous_school' => $validated['previous_school'] ?? null,
                'is_active' => $validated['is_active'] ?? $student->is_active,
            ]);

            AuditLog::create([
                'actor_id' => Auth::id(),
                'module' => 'students',
                'action' => 'update',
                'subject_id' => $student->id,
                'subject_type' => Student::class,
                'description' => "Updated student #{$student->id}: {$student->fname} {$student->lname}",
                'old_values' => json_encode($oldValues),
                'new_values' => json_encode($student->only([
                    'student_id',
                    'fname',
                    'mname',
                    'lname',
                    'sex',
                    'birthdate',
                    'incoming_grade_level',
                    'previous_school',
                    'is_active',
                ])),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Student updated successfully.',
                'student' => $student,
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Failed to update student.', [
                'error' => $e->getMessage(),
                'student_id' => $student->id,
                'auth_user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'Failed to update student. Please try again.',
            ], 500);
        }
    }

    public function destroy(Student $student)
    {
        if ($student->trashed()) {
            throw ValidationException::withMessages([
                'student' => ['This student is already archived.'],
            ]);
        }

        DB::beginTransaction();

        try {
            $oldValues = $student->only([
                'student_id',
                'fname',
                'mname',
                'lname',
                'sex',
                'birthdate',
                'incoming_grade_level',
                'previous_school',
                'is_active',
            ]);

            $student->update([
                'is_active' => false,
            ]);

            $student->delete();

            AuditLog::create([
                'actor_id' => Auth::id(),
                'module' => 'students',
                'action' => 'archive',
                'subject_id' => $student->id,
                'subject_type' => Student::class,
                'description' => "Archived student #{$student->id}: {$student->fname} {$student->lname}",
                'old_values' => json_encode($oldValues),
                'new_values' => json_encode([
                    ...$oldValues,
                    'is_active' => false,
                    'deleted_at' => now()->toDateTimeString(),
                ]),
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Student archived successfully.',
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Failed to archive student.', [
                'error' => $e->getMessage(),
                'student_id' => $student->id,
                'auth_user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'Failed to archive student. Please try again.',
            ], 500);
        }
    }

    public function restore($id)
    {
        $student = Student::onlyTrashed()->findOrFail($id);

        DB::beginTransaction();

        try {
            $student->restore();
            $student->update([
                'is_active' => true,
            ]);

            AuditLog::create([
                'actor_id' => Auth::id(),
                'module' => 'students',
                'action' => 'restore',
                'subject_id' => $student->id,
                'subject_type' => Student::class,
                'description' => "Restored student #{$student->id}: {$student->fname} {$student->lname}",
                'old_values' => null,
                'new_values' => json_encode($student->only([
                    'student_id',
                    'fname',
                    'mname',
                    'lname',
                    'sex',
                    'birthdate',
                    'incoming_grade_level',
                    'previous_school',
                    'is_active',
                ])),
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Student restored successfully.',
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Failed to restore student.', [
                'error' => $e->getMessage(),
                'student_id' => $id,
                'auth_user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'Failed to restore student. Please try again.',
            ], 500);
        }
    }
}
