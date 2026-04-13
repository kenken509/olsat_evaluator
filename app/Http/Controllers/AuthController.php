<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function index()
    {
        return inertia('Auth/Index');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'Invalid credentials.',
            ]);
        }

        $request->session()->regenerate();

        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if (! $user) {
            Auth::logout();

            throw ValidationException::withMessages([
                'email' => 'Authentication failed.',
            ]);
        }

        if (! $user->is_active) {
            Auth::logout();

            throw ValidationException::withMessages([
                'general' => 'Your account is inactive. Please contact administrator.',
            ]);
        }

        $user->update([
            'last_login_at' => now(),
        ]);

        return match ($user->role) {
            'admin' => redirect('/admin-panel/dashboard'),
            'faculty' => redirect()->route('faculty.dashboard'),
            default => redirect('/'),
        };
    }

    public function destroy()
    {
        Auth::logout();

        return redirect('/');
    }
}
