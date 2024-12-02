<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        // Implement login logic here
       $credentials = $request->validated();
       if (!Auth::attempt($credentials)) {
        # code...
        return response([
            'message' => 'Provided email address is invalid'
        ], 422);
       }

       /** @var User $user */
       $user = Auth::user();
       $token = $user->createToken('main')->plainTextToken;
       return response(compact('user', 'token'));

    }

    public function signup(SignupRequest $request) {
        // Implement registration logic here
        $data = $request->validate();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' =>  bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request) {
        // Implement logout logic here
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
