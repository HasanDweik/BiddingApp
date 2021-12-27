<?php

namespace App\BusinessLogic\Interfaces;

interface InventoryManagerInterface {

    public function addItemToInventory($item, $userId);
    public function deleteInventoryItem($itemId);
    public function getUserInventoryItems();
    public function isOwner($itemId, $userId);
}
