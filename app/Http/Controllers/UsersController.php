<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        DB::beginTransaction();

        try {
            $user = User::create([
                'fname' => $validated['fname'],
                'lname' => $validated['lname'],
                'email' => $validated['email'],
                'role' => $validated['role'],
                'password' => Hash::make($validated['password']),
                'is_active' => true,
            ]);

            // AuditLog::create([
            //     'user_id' => auth()->id(),
            //     'action' => 'create_user',
            //     'description' => "Created user #{$user->id}: {$user->fname} {$user->lname}",
            // ]);

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
}
