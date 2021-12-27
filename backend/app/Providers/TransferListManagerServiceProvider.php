<?php

namespace App\Providers;

use App\BusinessLogic\Interfaces\TransferListManagerInterface;
use App\BusinessLogic\TransferListManager;
use Illuminate\Support\ServiceProvider;

class TransferListManagerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TransferListManagerInterface::class, TransferListManager::class);
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
