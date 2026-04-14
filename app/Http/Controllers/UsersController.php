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
        $q = $request->get('q', '');
        $perPage = $request->get('per_page', 10);

        $users = User::query()
            ->when($q, function ($query) use ($q) {
                $query->where(function ($subQuery) use ($q) {
                    $subQuery->where('fname', 'like', "%{$q}%")
                        ->orWhere('lname', 'like', "%{$q}%")
                        ->orWhere('email', 'like', "%{$q}%")
                        ->orWhere('role', 'like', "%{$q}%");
                });
            })
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        return response()->json($users);
    }
}
