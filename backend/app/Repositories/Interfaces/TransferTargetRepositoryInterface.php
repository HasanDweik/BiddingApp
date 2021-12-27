<?php

namespace App\Repositories\Interfaces;

interface TransferTargetRepositoryInterface
{
    public function addItemToTransferTarget($userId, $itemId, $bid, $sectionId);
    public function getByUser($itemId,$userId);
    public function delete($itemId,$userId);
    public function buyoutItemToTransferTarget($userId, $itemId,$marketId, $bid);
}
