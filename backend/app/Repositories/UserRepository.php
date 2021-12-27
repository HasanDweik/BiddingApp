<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class UserRepository implements UserRepositoryInterface
{
    public function checkUser($username, $password)
    {
        return Auth::attempt(['username' => $username, 'password' => $password]);
    }

    public function create($user)
    {
        return User::create($user);
    }

    public function getAllUsers()
    {
        return User::where('is_deleted', false)->get();
    }

    public function getUser($id)
    {
        return User::where('is_deleted', false)->where('id', $id)->first();
    }

    public function delete($id)
    {
        User::destroy($id);
    }

    public function safeDelete($id)
    {
        User::whereId($id)->update(array('is_deleted' => true));
    }

    public function update($id, array $user)
    {
        return User::whereId($id)->update($user);
    }

    public function updateBalance($id, $newBalance)
    {
        User::where('id', $id)->update(array('units' => $newBalance));
    }
}
