<?php

namespace App\Repositories;

use App\Models\TransferTarget;
use App\Repositories\Interfaces\TransferTargetRepositoryInterface;

class TransferTargetRepository implements TransferTargetRepositoryInterface
{
    public function addItemToTransferTarget($userId, $itemId, $bid, $marketId)
    {
        TransferTarget::updateOrCreate(
            ['user_id' => $userId, 'item_id' => $itemId, 'transfer_market_id' => $marketId],
            ['bid' => $bid, 'transfer_target_section_id' => 1]
        );
    }
        public function delete($itemId, $userId)
    {
        return TransferTarget::where('item_id', '=', $itemId)
            ->where('user_id', '=', $userId)
            ->whereIn('transfer_target_section_id', [1, 2])
            ->delete();
    }
       public function getByUser($itemId, $userId)
    {
        return TransferTarget::where('item_id', '=', $itemId)->where('user_id', '=', $userId)->first();
    }

    public function buyoutItemToTransferTarget($userId, $itemId,$marketId, $bid){
        TransferTarget::where('item_id', '=', $itemId)
        ->where('transfer_market_id','=', $marketId)
        ->where('user_id', '!=', $userId)
        ->delete();
        TransferTarget::updateOrCreate(
            ['user_id' => $userId, 'item_id' => $itemId, 'transfer_market_id' => $marketId],
            ['bid' => $bid, 'transfer_target_section_id' => 2]
        );
    }
}
