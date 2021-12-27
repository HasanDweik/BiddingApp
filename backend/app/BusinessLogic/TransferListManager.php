<?php

namespace App\BusinessLogic;

use App\BusinessLogic\Interfaces\TransferListManagerInterface;
use App\BusinessLogic\Interfaces\InventoryManagerInterface;
use App\Repositories\Interfaces\ItemRepositoryInterface;
use App\Repositories\Interfaces\TransferListRepositoryInterface;
use App\Repositories\Interfaces\TransferMarketRepositoryInterface;

use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class TransferListManager implements TransferListManagerInterface
{

    private TransferListRepositoryInterface $transferListRepository;
    private InventoryManagerInterface $inventoryManager;
    private TransferMarketRepositoryInterface $transferMarketRepository;
    private ItemRepositoryInterface $itemRepository;


    public function __construct(
        TransferListRepositoryInterface $transferListRepository,
        InventoryManagerInterface $inventoryManager,
        TransferMarketRepositoryInterface $transferMarketRepository,
        ItemRepositoryInterface $itemRepository
    ) {
        $this->transferListRepository = $transferListRepository;
        $this->inventoryManager = $inventoryManager;
        $this->itemRepository = $itemRepository;
        $this->transferMarketRepository = $transferMarketRepository;
    }

    public function isListIdAvailable($listId, $userId)
    {
        $listItem = $this->transferListRepository->getListIdByUser($listId, $userId);
        if ($listItem != null && !in_array($listItem->transfer_list_section_id, [1, 4])) {
            $listItem = null;
        }
        return $listItem != null;
    }

    public function isAvailable($itemId, $userId)
    {
        $listItem = $this->transferListRepository->getByUser($itemId, $userId);
        if ($listItem != null && !in_array($listItem->transfer_list_section_id, [1, 4])) {
            $listItem = null;
        }
        return $listItem != null;
    }

    public function moveToInventory($itemId, $userId)
    {
        try {
            $this->transferListRepository->delete($itemId, $userId);

            if ($this->inventoryManager->addItemToInventory($itemId, $userId)) {
                return true;
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    public function moveToTransferList($itemId, $userId)
    {
        try {
            $this->inventoryManager->deleteInventoryItem($itemId);
            if ($this->transferListRepository->addItemToTransferList($itemId, $userId, 1)) {
                return true;
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    public function clearSold($userId)
    {
        try {
            $this->transferListRepository->clearSold($userId);
            return true;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function addItemToTransferList($itemId, $userId, $sectionId)
    {
        try {
            $this->transferListRepository->addItemToTransferList($itemId, $userId, $sectionId);
            return true;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function getAllByUser($userId)
    {
        try {
            $transferList = $this->transferListRepository->getAllByUser($userId);
            return $transferList;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function listItem($listId, $buyoutPrice, $startingBid, $duration)
    {
        $durationArray = explode(" ", $duration);
        $days = intval(substr_replace($durationArray[0], "", -1));
        $hours = intval(substr_replace($durationArray[1], "", -1));
        $minutes = intval(substr_replace($durationArray[2], "", -1));
        $endingDate = Carbon::now()->addSeconds(86400 * $days + 3600 * $hours + 60 * $minutes);
        try {
            $this->transferListRepository->listItem($listId);
            $this->transferMarketRepository->auctionItem($listId, $buyoutPrice, $startingBid, $endingDate);
            return true;
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }

    public function getUserTransferListItems()
    {
        $authUser = Auth::user();
        $userId = $authUser->id;
        try {
            $items = $this->itemRepository->getUserTransferListItems($userId);
            return $items;
        } catch (Exception $ex) {
            return false;
        }
    }
    
}
