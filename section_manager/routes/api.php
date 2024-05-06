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
    return response()->json([
        'message' => 'Bienvenido a la API de Consumo de Data',
    ]);
});

Route::prefix('admin')->group(function () {
    Route::apiResource('sections', App\Http\Controllers\Api\Sections\AdminSectionController::class)
        ->names('admin.sections');
    Route::apiResource('sections.subsections', App\Http\Controllers\Api\Sections\AdminSubSectionController::class)
        ->only(['store', 'update', 'destroy', 'index'])
        ->names('admin.sections.subsections');
});

Route::apiResource('sections', App\Http\Controllers\Api\Sections\SectionController::class)
    ->only(['index', 'show'])
    ->names('sections');
