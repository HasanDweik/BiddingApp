<?php

namespace App\Http\Controllers\API;

use App\BusinessLogic\Interfaces\InventoryManagerInterface;
use App\BusinessLogic\Interfaces\TransferListManagerInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;

class InventoryController extends BaseController
{
    private InventoryManagerInterface $inventoryManager;
    private TransferListManagerInterface $transferListManager;

    public function __construct(InventoryManagerInterface $inventoryManager, TransferListManagerInterface $transferListManager)
    {
        $this->inventoryManager = $inventoryManager;
        $this->transferListManager = $transferListManager;
    }

    public function getUserInventoryItems()
    {
        $items = $this->inventoryManager->getUserInventoryItems();

        if ($items) {
            return $this->sendResponse($items, 200, null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
    }

    public function moveToTransferList(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'item_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors(), 400);
        }

        $user = Auth::user();
        if ($this->inventoryManager->isOwner($request->item_id, $user->id)) {
            if ($this->transferListManager->moveToTransferList($request->item_id, $user->id)) {
                return $this->sendResponse(null, 'Item successfully sent to the transfers list and removed from the inventory of the user.', null);
            } else {
                return $this->sendError('Error!', null, 500);
            }
        } else return $this->sendError('You do not have this item in your inventory', null, 401);
    }
}
