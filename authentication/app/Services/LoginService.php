<?php

namespace App\Services;

use App\Interfaces\ILoginService;
use Illuminate\Auth\AuthenticationException;

class LoginService implements ILoginService
{

    public function login(string $email, string $password): string
    {
        if (!$token = auth()->attempt(['email' => $email, 'password' => $password])) {
            throw new AuthenticationException();
        }
        return $token;
    }

    public function logout(): void
    {
        auth()->logout();
    }
    public function user(): \App\Models\User
    {
        $user = auth()->user();
        if (!$user) {
            throw new AuthenticationException();
        }
        return $user;
    }

    public function refresh(): string
    {
        return auth()->refresh();
    }
}
