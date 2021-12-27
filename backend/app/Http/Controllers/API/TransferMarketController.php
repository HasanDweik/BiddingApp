<?php

namespace App\Http\Controllers\API;

use App\BusinessLogic\Interfaces\TransferMarketManagerInterface;
use Illuminate\Http\Request;

use Validator;

class TransferMarketController extends BaseController
{
    private TransferMarketManagerInterface $transferMarketManager;

    public function __construct(TransferMarketManagerInterface $transferMarketManager)
    {
        $this->transferMarketManager = $transferMarketManager;
    }

    public function getUserTransferMarketItems()
    {


        $marketItems = $this->transferMarketManager->getUserTransferMarketItems();

        if ($marketItems) {
            return $this->sendResponse($marketItems, 200, null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
    }

    public function searchMarketPlace(Request $request)
    {
        if (is_null($request->min_buyout)) {
            $request->request->add(['min_buyout' => 0]);
        }
        if (is_null($request->min_bid)) {
            $request->request->add(['min_bid' => 0]);
        }
        $validator = Validator::make($request->all(), [
            'min_buyout' => 'numeric|between:0,9999999.99',
            'max_buyout' => 'numeric|between:0,9999999.99|gt:min_buyout',
            'min_bid' => 'numeric|between:0,9999999.99',
            'max_bid' => 'numeric|between:0,9999999.99|gt:min_bid',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors(), 400);
        }

        $itemFilters = array();
        $marketPlaceFilters = array();
        if ($request->title != null) {
            array_push($itemFilters, ['items.title', 'like', '%' . $request->title . '%']);
        }
        if ($request->min_bid != null) {
            array_push($marketPlaceFilters, ['transfer_markets.current_bid', '>=', $request->min_bid]);
        }
        if ($request->max_bid != null) {
            array_push($marketPlaceFilters, ['transfer_markets.current_bid', '<=', $request->max_bid]);
        }

        if ($request->min_buyout != null) {
            array_push($marketPlaceFilters, ['transfer_markets.buyout_price', '>=', $request->min_buyout]);
        }

        if ($request->max_buyout != null) {
            array_push($marketPlaceFilters, ['transfer_markets.buyout_price', '<=', $request->max_buyout]);
        }

        $marketItems = $this->transferMarketManager->searchMarketPlace($itemFilters, $marketPlaceFilters);
        if ($marketItems) {
            return $this->sendResponse($marketItems, 200, null);
        } else {
            return $this->sendError('Error!', null, 500);
        }
    }
    public function refreshMarket(){
         $transferListRepository = app('App\Repositories\Interfaces\TransferListRepositoryInterface');
        $transferMarketRepository = app('App\Repositories\Interfaces\TransferMarketRepositoryInterface');
        $transferTargetRepository = app('App\Repositories\Interfaces\TransferTargetRepositoryInterface');
        $userRepository = app('App\Repositories\Interfaces\UserRepositoryInterface');
        $marketItems = $transferMarketRepository->getActivePastMarketItems();
        foreach ($marketItems as $transferMarketItem){
            $marketId = $transferMarketItem->id;
            if ($transferMarketItem->current_bidder_id != null){
                $bidderId = $transferMarketItem->current_bidder_id;
                // update transfer market status to 2
                $transferMarketRepository->buyoutTransferMarketItem($marketId, $bidderId, $transferMarketItem->current_bid);
                 // update transfer target of the budder to won, delete all else
                $transferTargetRepository->buyoutItemToTransferTarget($bidderId, $transferMarketItem->item_id,$marketId, $transferMarketItem->current_bid);
                // update transfer list of the market item to sold (3)
                $transferListRepository->buyoutItemFromTransferList($transferMarketItem->item_id, $transferMarketItem->owner_id);
                // pay item owner
                $ownerUser = $userRepository->getUser($transferMarketItem->owner_id);
                $userRepository->updateBalance($ownerUser->id, $ownerUser->units + $transferMarketItem->current_bid);

            }else{
                // update transfer list of the market item to unsold (4)
                $transferListRepository->returnItemToTransferList($transferMarketItem->item_id, $transferMarketItem->owner_id);
                 // update transfer market status to 2
                $transferMarketRepository->closeTransferMarketItem($marketId);
            }
        }
            return $this->sendResponse("Transfer Market Refreshed", 200, null);

    }
}
