<?php

namespace App\BusinessLogic\Interfaces;

interface ItemManagerInterface
{
    public function createItem($item);
    public function getUserTransferTargetItems($userId);
}
