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

Route::get('/', function () {
    return response()->json(['message' => 'Bienvenido a la API de Autenticacion']);
});

Route::post("validate-token", App\Http\Controllers\ValidateTokenController::class);

Route::prefix('client')->group(function () {
    Route::post('login', [App\Http\Controllers\Api\Client\AuthenticationController::class, 'login'])->name('client.login');

    Route::post('register', App\Http\Controllers\Api\Client\RegisterController::class)->name('client.register');

    Route::middleware(['auth', 'role:client'])->group(function () {
        Route::post('logout', [App\Http\Controllers\Api\Client\AuthenticationController::class, 'logout'])->name('client.logout');
        Route::post('refresh', [App\Http\Controllers\Api\Client\AuthenticationController::class, 'refresh'])->name('client.refresh');
        Route::post('me', [App\Http\Controllers\Api\Client\AuthenticationController::class, 'me'])->name('client.me');
    });
});

Route::prefix('admin')->group(function () {
    Route::post('login', [App\Http\Controllers\Api\Admin\AuthenticationController::class, 'login'])->name('admin.login');

    Route::middleware(['auth', 'role:admin'])->group(function () {
        Route::post('logout', [App\Http\Controllers\Api\Admin\AuthenticationController::class, 'logout'])->name('admin.logout');
        Route::post('refresh', [App\Http\Controllers\Api\Admin\AuthenticationController::class, 'refresh'])->name('admin.refresh');
        Route::post('me', [App\Http\Controllers\Api\Admin\AuthenticationController::class, 'me'])->name('admin.me');
    });
});
