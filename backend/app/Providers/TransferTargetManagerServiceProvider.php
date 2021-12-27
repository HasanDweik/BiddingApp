<?php

namespace App\Providers;

use App\BusinessLogic\Interfaces\TransferTargetManagerInterface;
use App\BusinessLogic\TransferTargetManager;
use Illuminate\Support\ServiceProvider;

class TransferTargetManagerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TransferTargetManagerInterface::class, TransferTargetManager::class);
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
