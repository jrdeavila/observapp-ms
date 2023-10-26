<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function render($request, Throwable $e)
    {
        // When validation fails
        if ($e instanceof \Illuminate\Validation\ValidationException) {
            return response()->json([
                'message' => 'given_data_is_invalid',
                'errors' => $e->errors(),
            ], 422);
        }
        // When user is not authenticated
        if ($e instanceof \Illuminate\Auth\AuthenticationException) {
            return response()->json([
                'message' => 'unauthenticated',
            ], 401);
        }
        // When route not found
        if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            return response()->json([
                'message' => 'route_not_found',
            ], 404);
        }
        // When method not allowed
        if ($e instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException) {
            return response()->json([
                'message' => 'method_not_allowed',
            ], 405);
        }
        // When model not found
        if ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
            return response()->json([
                'message' => 'model_not_found',
            ], 404);
        }

        // When token expired
        if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json([
                'message' => 'token_expired',
            ], 401);
        }

        // When token blacklisted
        if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException) {
            return response()->json([
                'message' => 'token_blacklisted',
            ], 401);
        }


        return parent::render($request, $e);
    }
}
