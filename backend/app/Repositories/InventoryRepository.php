<?php

namespace App\Repositories;

use App\Models\Inventory;
use App\Repositories\Interfaces\InventoryRepositoryInterface;

class InventoryRepository implements InventoryRepositoryInterface
{
    public function addItemToInventory($itemId, $userId)
    {
        Inventory::create(
            ['item_id' => $itemId, 'user_id' => $userId]
        );
    }

    public function getByUser($itemId, $userId)
    {
        return Inventory::where('item_id', '=', $itemId)->where('user_id', '=', $userId)->first();
    }

    public function delete($itemId)
    {
        return Inventory::where('item_id', '=', $itemId)->delete();
    }
}
