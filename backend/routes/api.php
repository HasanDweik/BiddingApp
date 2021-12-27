<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\InventoryController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\TransferListController;
use App\Http\Controllers\API\TransferTargetController;
use App\Http\Controllers\API\TransferMarketController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/user/login', [AuthController::class, 'signin']);
Route::post('/user/register', [AuthController::class, 'signup']);
Route::post('/refreshMarket', [TransferMarketController::class, 'refreshMarket']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/user/logout', [AuthController::class, 'logout']);
    #get all transfer list items using the user id
    Route::get('/marketplace/transfer_list', [TransferListController::class, 'getAllByUser']);
    #list item on transfer market using the user id
    Route::post('/marketplace/transfer_list/auction', [TransferListController::class, 'listItem']);
    #clear sold items using the user id
    Route::post('/marketplace/transfer_list/clear_sold', [TransferListController::class, 'clearSold']);
    #move item from transfer list to inventory
    Route::post('/marketplace/transfer_list/move_to_inventory', [TransferListController::class, 'moveToInventory']);
    #move item from inventory to transferlist
    Route::post('/inventory/move_to_transfer_list', [InventoryController::class, 'moveToTransferList']);
    #create new item and add it to inventory
    Route::post('/item/create', [ItemController::class, 'createItem']);
    #get all items in the inventory
    Route::get('/inventory', [InventoryController::class, 'getUserInventoryItems']);
    #add the item to transfer target
    Route::post('/transferTarget', [TransferTargetController::class, 'addItemToTransferTarget']);
    #get all transfer target items
    Route::get('/transferTarget', [TransferTargetController::class, 'getUserTransferTargetItems']);
    #move transfer target item to inventory
    Route::post('/transferTarget/move_to_inventory', [TransferTargetController::class, 'moveToInventory']);
    # market place actions
    #get all transfer market items
    Route::get('/marketplace/market_items', [TransferMarketController::class, 'getUserTransferMarketItems']);
    #search items using filters
    Route::get('marketplace/search', [TransferMarketController::class, 'searchMarketPlace']);
    #buyout transfer market item
    Route::post('/marketplace/buyout', [TransferTargetController::class, 'BuyItem']);
});
