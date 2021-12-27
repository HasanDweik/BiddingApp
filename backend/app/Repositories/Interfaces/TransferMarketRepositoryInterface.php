<?php

namespace App\Repositories\Interfaces;

interface TransferMarketRepositoryInterface
{
    public function auctionItem($listId, $buyoutPrice, $startingBid, $endingDate);
    public function getTransferMarketItem($marketId);
    public function updateTransferMarketItemBid($marketId, $userId, $bid);
    public function buyoutTransferMarketItem($marketId, $userId, $buyoutPrice);
}
