<?php

namespace App\BusinessLogic;

use App\BusinessLogic\Interfaces\InventoryManagerInterface;
use App\BusinessLogic\Interfaces\ItemManagerInterface;
use App\Repositories\Interfaces\ItemRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\Auth;

class ItemManager implements ItemManagerInterface
{

    private ItemRepositoryInterface $itemRepository;
    private InventoryManagerInterface $inventoryManager;

    public function __construct(ItemRepositoryInterface $itemRepository, InventoryManagerInterface $inventoryManager)
    {
        $this->itemRepository = $itemRepository;
        $this->inventoryManager = $inventoryManager;
    }

    public function createItem($request)
    {
        $authUser = Auth::user();
        $userId = $authUser->id;
        $item = $request->only('title', 'description');
        // $thumbnail_path = $request->file('thumbnail')->store('items-images');
        $random = bin2hex(random_bytes(10));
        $request->file('thumbnail')->move(
            public_path("storage"),
            $request->file("thumbnail")->getClientOriginalName() . $random
        );

        $item['user_id'] = $userId;
        $item['thumbnail'] = $request->file("thumbnail")->getClientOriginalName() . $random;
        try {
            $item = $this->itemRepository->create($item);

            if ($this->inventoryManager->addItemToInventory($item->id, $userId)) {
                return true;
            }
        } catch (Exception $e) {
            return $e;
        }
        return false;
    }

    public function getUserTransferTargetItems($userId)
    {
        try {
            $items = $this->itemRepository->getUserTransferTargetItems($userId);
            return $items;
        } catch (Exception $ex) {
            return false;
        }
    }
}
