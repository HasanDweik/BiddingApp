<?php

namespace App\BusinessLogic;

use App\BusinessLogic\Interfaces\TransferTargetManagerInterface;
use App\Repositories\Interfaces\ItemRepositoryInterface;
use App\Repositories\Interfaces\TransferTargetRepositoryInterface;
use App\Repositories\Interfaces\TransferMarketRepositoryInterface;
use App\Repositories\Interfaces\TransferListRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\BusinessLogic\Interfaces\InventoryManagerInterface;


use Exception;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TransferTargetManager implements TransferTargetManagerInterface
{
    private TransferTargetRepositoryInterface $transferTargetRepository;
    private ItemRepositoryInterface $itemRepository;
    private UserRepositoryInterface $userRepository;
    private InventoryManagerInterface $inventoryManager;
    private TransferMarketRepositoryInterface $transferMarketRepository;
    private TransferListRepositoryInterface $transferListRepository;


    public function __construct(TransferTargetRepositoryInterface $transferTargetRepository,
    ItemRepositoryInterface $itemRepository, UserRepositoryInterface $userRepository, InventoryManagerInterface $inventoryManager,
    TransferMarketRepositoryInterface  $transferMarketRepository, TransferListRepositoryInterface $transferListRepository)
    {
        $this->transferTargetRepository = $transferTargetRepository;
        $this->itemRepository = $itemRepository;
        $this->userRepository = $userRepository;
        $this->inventoryManager = $inventoryManager;
        $this->transferMarketRepository =  $transferMarketRepository;
        $this->transferListRepository = $transferListRepository;

    }
     public function isAvailable($itemId, $userId)
    {
        $listItem = $this->transferTargetRepository->getByUser($itemId, $userId);
        if ($listItem != null && !in_array($listItem->transfer_target_section_id, [1, 2])) {
            $listItem = null;
        }
        return $listItem != null;
    }

    public function addItemToTransferTarget($request)
    {
        $authUser = Auth::user();
        $userId = $authUser->id;
        $itemId = $request->item_id;
        $bid = $request->bid;
        $marketId = $request->transfer_market_id;
        try {
            $transferMarketItem = $this->transferMarketRepository->getTransferMarketItem($marketId);
            // return the balance to the previous bidder

            if ($transferMarketItem->current_bidder_id != null){

                $previous_bidder = $this->userRepository->getUser($transferMarketItem->current_bidder_id);
                $this->userRepository->updateBalance($previous_bidder->id, $previous_bidder->units + $transferMarketItem->current_bid);
            }
            // update market item with new bid
            $this->transferMarketRepository->updateTransferMarketItemBid($marketId, $userId, $bid);
            //
            // add transfer target
            $this->transferTargetRepository->addItemToTransferTarget($userId, $transferMarketItem->item_id, $bid,$marketId);
            //

            $newBalance = $authUser['units'] - $bid;
            $this->userRepository->updateBalance($authUser->id, $newBalance);
            $response['balance'] = $newBalance;
            return $response;

        } catch (Exception $e) {
            dd($e->getMessage());
            return false;
        }
    }

    public function validateTransaction($marketId, $bid)
    {
        $transferMarketItem = $this->transferMarketRepository->getTransferMarketItem($marketId);
        $user = Auth::user();
        return $transferMarketItem != null
            && $user->id != $transferMarketItem->owner_id
            && $transferMarketItem->current_bidder_id != $user->id
            && $transferMarketItem->current_bid < $bid
            && $transferMarketItem->starting_bid <= $bid
            && $transferMarketItem->ending_date_time >= Carbon::now()
            && $transferMarketItem->status == 1
            && ($user['units'] - $bid) > 0
            && $transferMarketItem->buyout_price >= $bid;

    }

    public function getUserTransferTargetItems()
    {
        $authUser = Auth::user();
        $userId = $authUser->id;
        try {
            $items = $this->itemRepository->getUserTransferTargetItems($userId);
            return $items;
        } catch (Exception $ex) {
            return false;
        }
    }
        public function moveToInventory($itemId, $userId)
    {
        try {
            $this->transferTargetRepository->delete($itemId, $userId);

            if ($this->inventoryManager->addItemToInventory($itemId, $userId)) {
                return true;
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    public function validateBuyTransaction($marketId){
        $transferMarketItem = $this->transferMarketRepository->getTransferMarketItem($marketId);
        $user = Auth::user();
        if ($transferMarketItem->current_bidder_id == $user->id){
            $balance = $user['units'] + $transferMarketItem->current_bid;
        }else $balance = $user['units'];

        return $transferMarketItem != null
            && $user->id != $transferMarketItem->owner_id
            && $balance >= $transferMarketItem->buyout_price
            && $transferMarketItem->ending_date_time >= Carbon::now()
            && $transferMarketItem->status == 1;
    }

    public function buyMarketItem($marketId){
        $authUser = Auth::user();
        $userId = $authUser->id;
        try {
            $transferMarketItem = $this->transferMarketRepository->getTransferMarketItem($marketId);
            // return the balance to the previous bidder
            if ($transferMarketItem->current_bidder_id != null){
                $previous_bidder = $this->userRepository->getUser($transferMarketItem->current_bidder_id);
                $this->userRepository->updateBalance($previous_bidder->id, $previous_bidder->units + $transferMarketItem->current_bid);

            }
            // update market item with new bid
            $this->transferMarketRepository->buyoutTransferMarketItem($marketId, $userId, $transferMarketItem->buyout_price);
            //
            // add transfer target
            $this->transferTargetRepository->buyoutItemToTransferTarget($userId, $transferMarketItem->item_id,$marketId, $transferMarketItem->buyout_price);
            //
            $this->transferListRepository->buyoutItemFromTransferList($transferMarketItem->item_id, $transferMarketItem->owner_id);

            // this is in the case the same user was the latest bidder, update the balance
            $updatedUser = $this->userRepository->getUser($userId);
            //


            $newBalance = $updatedUser->units - $transferMarketItem->buyout_price;

            $this->userRepository->updateBalance($authUser->id, $newBalance);

            $ownerUser = $this->userRepository->getUser($transferMarketItem->owner_id);
            $this->userRepository->updateBalance($ownerUser->id, $ownerUser->units + $transferMarketItem->buyout_price);
            $response['balance'] = $newBalance;
            return $response;

        } catch (Exception $e) {
            dd($e->getMessage());
            return false;
        }
    }
}

