<?php

namespace App\BusinessLogic\Interfaces;

interface TransferListManagerInterface
{
    public function listItem($listId, $buyoutPrice, $startingBid, $duration);
    public function moveToInventory($itemId, $userId);
    public function clearSold($userId);
    public function moveToTransferList($itemId, $userId);
    public function addItemToTransferList($itemId, $userId, $sectionId);
    public function getAllByUser($userId);
    public function getUserTransferListItems();
    public function isAvailable($itemId, $userId);
    public function isListIdAvailable($listId, $userId);
}
