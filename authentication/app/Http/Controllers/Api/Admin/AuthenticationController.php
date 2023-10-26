<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\AuthController;
use App\Http\Requests\Api\Admin\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

class AuthenticationController extends AuthController
{
    public function login(LoginRequest $request)
    {
        $token = auth()->attempt($request->validated());

        throw_unless($token, new AuthenticationException());

        return $this->respondWithToken($token);
    }


    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
}
