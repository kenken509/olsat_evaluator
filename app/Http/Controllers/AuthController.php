<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index()
    {
        return inertia('Auth/Index');
    }

    public function authenticate(Request $request)
    {
        dd('yoooooooooooooooo');
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
    }
}
