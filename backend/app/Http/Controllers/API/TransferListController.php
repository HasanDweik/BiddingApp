<?php

namespace App\Http\Controllers\API;

use App\BusinessLogic\Interfaces\TransferListManagerInterface;
use App\Rules\SaleDuration;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;
use Validator;

class TransferListController extends BaseController
{
    private TransferListManagerInterface $transferListManager;
    public function __construct(TransferListManagerInterface $transferListManager)
    {
        $this->transferListManager = $transferListManager;
    }

    public function listItem(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'list_id' => 'required',
            'buyout_price' => 'required|numeric|between:0,9999999.99',
            'starting_price' => 'required|numeric|between:0,9999999.99',
            'duration' => ['required', new SaleDuration]
        ]);
        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors(), 400);
        }

        $user = Auth::user();

        if ($this->transferListManager->isListIdAvailable($request->list_id, $user->id)) {
            if ($this->transferListManager->listItem($request->list_id, $request->buyout_price, $request->starting_price, $request->duration)) {
                return $this->sendResponse(null, 'Item successfully put on the market place.', null);
            } else {
                return $this->sendError('Error!', null, 500);
            }
        } else return $this->sendError('You do not own this transfer list item as an available item.', null, 401);
    }

    public function moveToInventory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'item_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors(), 400);
        }

        $user = Auth::user();
        if ($this->transferListManager->isAvailable($request->item_id, $user->id)) {
            if ($this->transferListManager->moveToInventory($request->item_id, $user->id)) {
                return $this->sendResponse(null, 'Item successfully sent to inventory and removed from the transfer list of the user.', null);
            } else {
                return $this->sendError('Error!', null, 500);
            }
        } else return $this->sendError('You do not have this item as available in your transfer list', null, 401);
    }

    public function clearSold()
    {
        $user = Auth::user();
        if ($this->transferListManager->clearSold($user->id)) {
            return $this->sendResponse(null, 'Your sold items history has been successfully cleared.', null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
    }

    public function getAllByUser()
    {
        $user = Auth::user();

        $items = $this->transferListManager->getUserTransferListItems();

        // $transferList = $this->transferListManager->getAllByUser($user->id);

        if ($items) {
            return $this->sendResponse($items, 200, null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
    }
}
