<?php

namespace App\Providers;

use App\Repositories\Interfaces\InventoryRepositoryInterface;
use App\Repositories\InventoryRepository;
use Illuminate\Support\ServiceProvider;

class InventoryRepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(InventoryRepositoryInterface::class, InventoryRepository::class);
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
