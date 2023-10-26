<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get("/", function () {
    return response()->json([
        "message" => "Bienvenido a la API de administracion de usuarios"
    ]);
});


Route::apiResource("users", \App\Http\Controllers\Api\Users\ManagmentController::class)->names('api.users');
