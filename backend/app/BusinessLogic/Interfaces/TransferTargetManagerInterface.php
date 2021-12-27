<?php

namespace App\BusinessLogic\Interfaces;

interface TransferTargetManagerInterface
{
    public function isAvailable($itemId, $userId);
    public function addItemToTransferTarget($request);
    public function getUserTransferTargetItems();
    public function moveToInventory($itemId, $userId);
    public function validateTransaction($marketId, $bid);
    public function validateBuyTransaction($marketId);
    public function buyMarketItem($marketId);
}
