<?php

namespace App\Providers;

use App\BusinessLogic\Interfaces\ItemManagerInterface;
use App\BusinessLogic\ItemManager;
use Illuminate\Support\ServiceProvider;

class ItemManagerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ItemManagerInterface::class, ItemManager::class);
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
