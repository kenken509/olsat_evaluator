<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
}
