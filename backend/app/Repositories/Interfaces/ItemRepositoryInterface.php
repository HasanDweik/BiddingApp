<?php

namespace App\Repositories\Interfaces;

interface ItemRepositoryInterface
{
    public function create($item);
    public function getAllItems();
    public function getUserInventoryItems($userId);
    public function getUserTransferTargetItems($userId);
    public function getUserTransferListItems($userId);
    public function getUserTransferMarketItems($userId);
    public function searchMarketPlace($itemFilters, $marketFilters);
}
