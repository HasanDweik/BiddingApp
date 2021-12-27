<?php

namespace App\Repositories\Interfaces;

interface TransferListRepositoryInterface
{
    public function listItem($listId);
    public function clearSold($userId);
    public function addItemToTransferList($itemId, $userId,$sectionId);
    public function getListIdByUser($listId,$userId);
    public function getByUser($itemId,$userId);
    public function delete($itemId,$userId);
    public function getAllByUser($userId);
    public function buyoutItemFromTransferList($itemId, $ownerId);
}
