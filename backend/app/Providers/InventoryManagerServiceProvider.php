<?php

namespace App\Providers;

use App\BusinessLogic\Interfaces\InventoryManagerInterface;
use App\BusinessLogic\InventoryManager;
use Illuminate\Support\ServiceProvider;

class InventoryManagerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(InventoryManagerInterface::class, InventoryManager::class);
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
