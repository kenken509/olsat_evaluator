<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UsersController extends Controller
{
    public function index()
    {

        $header = [
            'title' => 'Users',
            'subtitle' => 'List of users'
        ];

        return inertia('Admin/Users/Index', [
            'header' => $header,
            'authUserId' => Auth::id(),
        ]);
    }

    public function allUsers(Request $request)
    {
        $q = trim($request->get('q', ''));
        $perPage = (int) $request->get('per_page', 10);
        $view = $request->get('view', 'active');

        $query = User::query();

        if ($view === 'archived') {
            $query->onlyTrashed();
        } else {
            $query->where('is_active', true);
        }

        $query->when($q, function ($query) use ($q) {
            $query->where(function ($subQuery) use ($q) {
                $subQuery->where('fname', 'like', "%{$q}%")
                    ->orWhere('lname', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%")
                    ->orWhere('role', 'like', "%{$q}%");
            });
        });

        $users = $query
            ->orderBy('id', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return response()->json($users);
    }

    public function destroy(User $user)
    {
        if (Auth::id() === $user->id) {
            return response()->json([
                'message' => 'You cannot archive your own account.'
            ], 422);
        }

        $user->delete();

        return response()->json([
            'message' => 'User archived successfully.',
        ]);
    }

    public function restore($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();

        return response()->json([
            'message' => 'User restored successfully.',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', 'in:admin,faculty,evaluator'],
        ]);

        DB::beginTransaction();

        try {
            $user = User::create([
                'fname' => $validated['fname'],
                'lname' => $validated['lname'],
                'email' => $validated['email'],
                'role' => $validated['role'],
                'password' => Hash::make('password'),
                'is_active' => true,
            ]);

            AuditLog::create([
                'actor_id' => Auth::id(),
                'module' => 'users',
                'action' => 'create',
                'subject_id' => $user->id,
                'subject_type' => User::class,
                'description' => "Created user #{$user->id}: {$user->fname} {$user->lname}",
                'old_values' => null,
                'new_values' => json_encode([
                    'fname' => $user->fname,
                    'lname' => $user->lname,
                    'email' => $user->email,
                    'role' => $user->role,
                    'is_active' => $user->is_active,
                ]),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'User created successfully.',
                'user' => $user,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Failed to create user.', [
                'error' => $e->getMessage(),
                'email' => $request->email,
                'auth_user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'Failed to create user. Please try again.',
            ], 500);
        }
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'role' => ['required', 'in:admin,faculty,evaluator'],
        ]);

        DB::beginTransaction();

        // admin change own role protection
        if (Auth::id() === $user->id && $request->role !== $user->role) {
            return response()->json([
                'message' => 'You cannot change your own role.',
            ], 422);
        }

        try {
            $oldValues = [
                'fname' => $user->fname,
                'lname' => $user->lname,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
            ];

            $user->update([
                'fname' => $validated['fname'],
                'lname' => $validated['lname'],
                'email' => $validated['email'],
                'role' => $validated['role'],
            ]);

            AuditLog::create([
                'actor_id' => Auth::id(),
                'module' => 'users',
                'action' => 'update',
                'subject_id' => $user->id,
                'subject_type' => User::class,
                'description' => "Updated user #{$user->id}: {$user->fname} {$user->lname}",
                'old_values' => json_encode($oldValues),
                'new_values' => json_encode([
                    'fname' => $user->fname,
                    'lname' => $user->lname,
                    'email' => $user->email,
                    'role' => $user->role,
                    'is_active' => $user->is_active,
                ]),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'User updated successfully.',
                'user' => $user,
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Failed to update user.', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
                'auth_user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'Failed to update user. Please try again.',
            ], 500);
        }
    }
}
