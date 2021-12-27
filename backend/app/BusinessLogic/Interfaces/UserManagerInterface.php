<?php

namespace App\BusinessLogic\Interfaces;

interface UserManagerInterface
{
    public function checkSignin($username, $password);
    public function createUser($user);
}
