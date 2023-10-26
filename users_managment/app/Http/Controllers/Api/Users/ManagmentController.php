<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

use App\Http\Requests\Api\Users\CreateNewAdminRequest;
use Illuminate\Support\Facades\DB;

class ManagmentController extends Controller
{
    public function index()
    {
        $query = "SELECT
                        u.id,
                        u.name,
                        u.email,
                        r.name AS role,
                        CASE
                            WHEN u.email_verified_at IS NULL THEN false
                            ELSE true
                        END AS email_verified
                  FROM users u 
                  JOIN model_has_roles mhr 
                  ON u.id = mhr.model_id 
                  JOIN roles r ON mhr.role_id = r.id";
        $users =  DB::select($query);

        return response()->json([
            "data" => $users
        ]);
    }

    public function store(CreateNewAdminRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json([
            "data" => $user
        ]);
    }
}
