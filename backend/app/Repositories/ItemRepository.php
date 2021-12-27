<?php

namespace App\Repositories;

use App\Models\Item;
use App\Repositories\Interfaces\ItemRepositoryInterface;

class ItemRepository implements ItemRepositoryInterface
{
    public function create($item)
    {
        return Item::create($item);
    }

    public function getAllItems()
    {
        return Item::all();
    }

    public function getUserInventoryItems($userId)
    {
        return Item::join('inventories', 'items.id', '=', 'inventories.item_id')
            ->where('inventories.user_id', $userId)
            ->get(['items.*']);
    }


    public function getUserTransferTargetItems($userId)
    {
        return Item::join('transfer_targets', 'items.id', '=', 'transfer_targets.item_id')
            ->where('transfer_targets.user_id', $userId)
            ->get(['items.*', 'transfer_targets.transfer_target_section_id']);
    }
    public function getUserTransferListItems($userId)
    {
        return Item::join('transfer_lists', 'items.id', '=', 'transfer_lists.item_id')
            ->where('transfer_lists.user_id', $userId)
            ->get(['items.*', 'transfer_lists.transfer_list_section_id', 'transfer_lists.id as list_id']);
    }

    public function getUserTransferMarketItems($userId)
    {
        return
            Item::join('transfer_lists', 'items.id', '=', 'transfer_lists.item_id')
            ->join('transfer_markets', 'transfer_lists.id', '=', 'transfer_markets.transfer_list_id')
            ->where('transfer_lists.user_id', $userId)
            ->get([
                'transfer_markets.*',
                'transfer_lists.user_id as item_owner_id',
                'items.id as item_id',
                'items.title as item_title',
                'items.description as item_description',
                'items.thumbnail as item_thumbnail'
            ]);
    }

    public function searchMarketPlace($itemFilters, $marketFilters)
    {
        return
            Item::join('transfer_lists', 'items.id', '=', 'transfer_lists.item_id')
            ->join('transfer_markets', 'transfer_lists.id', '=', 'transfer_markets.transfer_list_id')
            ->where($itemFilters)
            ->where($marketFilters)
            ->get([
                'transfer_markets.*',
                'transfer_lists.user_id as item_owner_id',
                'items.id as item_id',
                'items.title as item_title',
                'items.description as item_description',
                'items.thumbnail as item_thumbnail'
            ]);
    }
    
}
