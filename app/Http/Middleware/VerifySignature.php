<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifySignature
{
    public function handle(Request $request, Closure $next)
    {
        $apiSecretKey = config('api.secret_key');
        $timestamp = $request->header('X-Timestamp');
        $signature = $request->header('X-Signature');

        // Check if timestamp is within 5 minutes
        if (abs(time() - $timestamp) > 300) {
            return response()->json(['error' => 'Request expired'], 401);
        }

        // Handle empty content for DELETE requests
        $payload = $request->method() === 'DELETE' ? '' : $request->getContent();
        $payload .= $timestamp;

        // Generate server-side signature
        $serverSignature = hash_hmac('sha256', $payload, $apiSecretKey);

        // Compare signatures
        if (!hash_equals($serverSignature, $signature)) {
            return response()->json(['error' => 'Invalid signature'], 403);
        }

        return $next($request);
    }
}
