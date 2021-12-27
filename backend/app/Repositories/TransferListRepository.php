<?php

namespace App\Repositories;

use App\Models\TransferList;
use App\Repositories\Interfaces\TransferListRepositoryInterface;

class TransferListRepository implements TransferListRepositoryInterface
{
    public function addItemToTransferList($itemId, $userId, $sectionId)
    {
        return TransferList::insert(
            ['item_id' => $itemId, 'user_id' => $userId, 'transfer_list_section_id' => $sectionId]
        );
    }

    public function delete($itemId, $userId)
    {
        return TransferList::where('item_id', '=', $itemId)
            ->where('user_id', '=', $userId)
            ->whereIn('transfer_list_section_id', [1, 4])
            ->delete();
    }

    public function getByUser($itemId, $userId)
    {
        return TransferList::where('item_id', '=', $itemId)->where('user_id', '=', $userId)->first();
    }

    public function getListIdByUser($listId, $userId)
    {
        return TransferList::where('id', '=', $listId)->where('user_id', '=', $userId)->first();
    }

    public function getAllByUser($userId)
    {
        return TransferList::where('user_id', '=', $userId)->get();
    }

    public function clearSold($userId)
    {
        return TransferList::where('user_id', '=', $userId)
            ->where('transfer_list_section_id', '=', 3)
            ->delete();
    }

    public function listItem($listId)
    {
        return TransferList::where('id', '=', $listId)->update(['transfer_list_section_id' => 2]);
    }

    public function buyoutItemFromTransferList($itemId, $ownerId)
    {
        return TransferList::where('item_id', '=', $itemId)
            ->where('user_id', '=', $ownerId)
            ->where('transfer_list_section_id', '=', 2)
            ->update(['transfer_list_section_id' => 3]);
    }

    public function returnItemToTransferList($itemId, $ownerId)
    {
        return TransferList::where('item_id', '=', $itemId)
            ->where('user_id', '=', $ownerId)
            ->where('transfer_list_section_id', '=', 2)
            ->update(['transfer_list_section_id' => 4]);
    }
    
}
