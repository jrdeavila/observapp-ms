<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValidateTokenController extends Controller
{
    public function __invoke(Request $request)
    {
        return response()->json(auth()->user());
    }
}
