<?php

namespace App\Http\Controllers\API;

use App\BusinessLogic\Interfaces\UserManagerInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Validator;

class AuthController extends BaseController
{
    private UserManagerInterface $userManager;

    public function __construct(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    public function signin(Request $request)
    {
        $check = $this->userManager->checkSignin($request->username, $request->password);

        if ($check != null) {
            $cookie = cookie('jwt', $check['token'], 60 * 24); //1day
            $user = $check['user'];
            return $this->sendResponse($user, 'User signed in', $cookie);
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised'], 401);
        }
    }

    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required',
            'lastname' => 'required',
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors(), 400);
        }
        $success = $this->userManager->createUser($request->all());
        return $this->sendResponse($success, 'User created successfully.', null);
    }

    public function user()
    {
        return Auth::user();
    }

    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return $this->sendResponse(null, 'Success!', $cookie);
    }
}
