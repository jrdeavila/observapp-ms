<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\AuthController;
use App\Http\Requests\Api\Client\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

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
