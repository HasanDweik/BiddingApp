<?php

namespace App\Repositories\Interfaces;

interface InventoryRepositoryInterface
{
    public function addItemToInventory($item, $userId);
    public function delete($itemId);
    public function getByUser($itemId, $userId);
}
