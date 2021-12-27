<?php

namespace App\Providers;

use App\BusinessLogic\Interfaces\TransferMarketManagerInterface;
use App\BusinessLogic\TransferMarketManager;
use Illuminate\Support\ServiceProvider;

class TransferMarketManagerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TransferMarketManagerInterface::class, TransferMarketManager::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
