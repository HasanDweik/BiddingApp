<?php

namespace App\BusinessLogic;

use App\BusinessLogic\Interfaces\InventoryManagerInterface;
use App\Repositories\Interfaces\InventoryRepositoryInterface;
use App\Repositories\Interfaces\ItemRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\Auth;

class InventoryManager implements InventoryManagerInterface
{

    private InventoryRepositoryInterface $inventoryRepository;
    private ItemRepositoryInterface $itemRepository;

    public function __construct(InventoryRepositoryInterface $inventoryRepository, ItemRepositoryInterface $itemRepository)
    {
        $this->inventoryRepository = $inventoryRepository;
        $this->itemRepository = $itemRepository;
    }

    public function isOwner($itemId, $userId)
    {
        $inventoryItem = $this->inventoryRepository->getByUser($itemId, $userId);
        return $inventoryItem != null;
    }

    public function deleteInventoryItem($itemId)
    {
        try {
            $this->inventoryRepository->delete($itemId);
            return true;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function addItemToInventory($itemId, $userId)
    {
        try {
            $this->inventoryRepository->addItemToInventory($itemId, $userId);
            return true;
        } catch (Exception $ex) {
            return false;
        }
    }

    public function getUserInventoryItems()
    {
        $authUser = Auth::user();
        $userId = $authUser->id;
        try {
            $items = $this->itemRepository->getUserInventoryItems($userId);
            return $items;
        } catch (Exception $ex) {
            dd($ex->getMessage());
            return false;
        }
    }
}
