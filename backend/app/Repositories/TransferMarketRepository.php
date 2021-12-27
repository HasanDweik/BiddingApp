<?php

namespace App\Repositories;

use App\Models\TransferMarket;
use App\Repositories\Interfaces\TransferMarketRepositoryInterface;
use Carbon\Carbon;

class TransferMarketRepository implements TransferMarketRepositoryInterface
{
    public function auctionItem($listId, $buyoutPrice, $startingPrice, $endDate)
    {
        TransferMarket::insert(
            ['transfer_list_id' => $listId, 'ending_date_time' => $endDate, 'buyout_price' => $buyoutPrice, 'starting_bid' => $startingPrice, 'status' => 1]
        );
    }

    public function getTransferMarketItem($marketId)
    {
        return TransferMarket::where('transfer_markets.id', '=', $marketId)
            ->join('transfer_lists', 'transfer_lists.id', '=', 'transfer_markets.transfer_list_id')
            ->first([
                'transfer_lists.item_id as item_id',
                'transfer_lists.user_id as owner_id',
                'transfer_markets.*'
            ]);
    }

    public function updateTransferMarketItemBid($marketId, $userId, $bid)
    {
        return TransferMarket::where('id', '=', $marketId)->update(['current_bidder_id' => $userId, 'current_bid' => $bid]);
    }

    public function buyoutTransferMarketItem($marketId, $userId, $buyoutPrice)
    {
        return TransferMarket::where('id', '=', $marketId)->update(['current_bidder_id' => $userId, 'current_bid' => $buyoutPrice, 'status' => 2]);
    }

    public function getActivePastMarketItems()
    {
        return TransferMarket::where('transfer_markets.ending_date_time', '<', Carbon::now())
            ->where('transfer_markets.status', '=', 1)
            ->join('transfer_lists', 'transfer_lists.id', '=', 'transfer_markets.transfer_list_id')
            ->get([
                'transfer_lists.item_id as item_id',
                'transfer_lists.user_id as owner_id',
                'transfer_markets.*'
            ]);
    }

    public function closeTransferMarketItem($marketId)
    {
        return TransferMarket::where('id', '=', $marketId)->update(['status' => 2]);
    }
    
}
