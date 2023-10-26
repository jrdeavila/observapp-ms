<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\AuthController;
use App\Http\Requests\Api\Client\RegisterRequest;
use App\Models\User;

class RegisterController extends AuthController
{
    public function __invoke(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        $user->assignRole('client');

        $token = auth("api")->attempt($request->validated());
        return $this->respondWithToken($token);
    }
}
