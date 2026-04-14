<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
