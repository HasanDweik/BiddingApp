<?php

namespace App\BusinessLogic;

use App\BusinessLogic\Interfaces\UserManagerInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class UserManager implements UserManagerInterface
{

    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function checkSignin($username, $password)
    {
        if ($this->userRepository->checkUser($username, $password)) {
            /** @var \App\Models\User $authUser **/
            $authUser = Auth::user();
            $success['user'] = $authUser;
            $success['token'] =  $authUser->createToken('auth')->plainTextToken;
            return $success;
        }
        return null;
    }

    public function createUser($user)
    {
        $user['role_id'] = 2;
        $user['password'] = bcrypt($user['password']);
        $user['units'] = 10000;
        $user = $this->userRepository->create($user);
        $success['token'] =  $user->createToken('auth')->plainTextToken;
        $success['username'] =  $user->username;
        return $success;
    }
}
