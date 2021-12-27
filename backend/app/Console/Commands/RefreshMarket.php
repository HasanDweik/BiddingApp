<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RefreshMarket extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:refreshMarket';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command used to refresh the market place by periodically closing ending auctions.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
      
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
        
        return Command::SUCCESS;
    }
}
