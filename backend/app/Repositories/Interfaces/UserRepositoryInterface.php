<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function checkUser($username, $password);
    public function getAllUsers();
    public function getUser($id);
    public function create($user);
    public function update($id, array $user);
    public function delete($id);
    public function safeDelete($id);
    public function updateBalance($id, $newBalance);
}
