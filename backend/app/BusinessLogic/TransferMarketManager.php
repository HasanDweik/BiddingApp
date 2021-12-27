<?php

namespace App\BusinessLogic;

use App\BusinessLogic\Interfaces\TransferMarketManagerInterface;
use App\Repositories\Interfaces\ItemRepositoryInterface;

use Exception;
use Illuminate\Support\Facades\Auth;

class TransferMarketManager implements TransferMarketManagerInterface
{
    private ItemRepositoryInterface $itemRepository;

    public function __construct(ItemRepositoryInterface $itemRepository)
    {
        $this->itemRepository = $itemRepository;
    }

    public function getUserTransferMarketItems()
    {
        $authUser = Auth::user();
        $userId = $authUser->id;
        try {
            $items = $this->itemRepository->getUserTransferMarketItems($userId);
            return $items;
        } catch (Exception $ex) {
            return false;
        }
    }

    public function searchMarketPlace($itemFilters, $marketFilters)
    {
        try {
            $items = $this->itemRepository->searchMarketPlace($itemFilters, $marketFilters);
            return $items;
        } catch (Exception $ex) {
            return false;
        }
    }
}
