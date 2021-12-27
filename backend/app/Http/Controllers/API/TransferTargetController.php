<?php

namespace App\Http\Controllers\API;

use App\BusinessLogic\Interfaces\TransferTargetManagerInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Validator;

class TransferTargetController extends BaseController
{
    private TransferTargetManagerInterface $transferTargetManager;

    public function __construct(TransferTargetManagerInterface $transferTargetManager)
    {
        $this->transferTargetManager = $transferTargetManager;
    }

    public function addItemToTransferTarget(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'transfer_market_id' => 'required',
            'bid' => 'required|numeric|between:0,9999999.99'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors(), 400);
        }
        $isValid = $this->transferTargetManager->validateTransaction($request->transfer_market_id, $request->bid);
        if (!$isValid) {
            return $this->sendError(
                "This bid is invalid, please check the following:
                    1- You are not the owner.
                    2- You are not the current bidder.
                    3- Your bid is higher than the current bid.
                    4- Your bid is higher than the starting bid.
                    5- The auction is still open.
                    6- The auction exists.
                    7- You have enough balance in your wallet.
                    8- The bid is less than the buyout price."
            );
        }

        $balance = $this->transferTargetManager->addItemToTransferTarget($request);
        if ($balance) {
            return $this->sendResponse($balance, 200, null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
    }

    public function getUserTransferTargetItems()
    {
        $items = $this->transferTargetManager->getUserTransferTargetItems();

        if ($items) {
            return $this->sendResponse($items, 200, null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
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
        if ($this->transferTargetManager->isAvailable($request->item_id, $user->id)) {
            if ($this->transferTargetManager->moveToInventory($request->item_id, $user->id)) {
                return $this->sendResponse(null, 'Item successfully sent to inventory and removed from the transfer target of the user.', null);
            } else {
                return $this->sendError('Error!', null, 500);
            }
        } else return $this->sendError('You do not have this item as available in your transfer target', null, 401);
    }

    public function BuyItem(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'transfer_market_id' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors(), 400);
        }
        $user = Auth::user();
        $isValid = $this->transferTargetManager->validateBuyTransaction($request->transfer_market_id);
        if (!$isValid) {
            return $this->sendError(
                "This buy out is invalid, please check the following:
                    1- You are not the owner of the item.
                    2- You have enough funds in your wallet.
                    3- The auction is still open.
                    4- The auction exists."
            );
        }

        $balance = $this->transferTargetManager->BuyMarketItem($request->transfer_market_id);
        if ($balance) {
            return $this->sendResponse($balance, 200, null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
    }
}
