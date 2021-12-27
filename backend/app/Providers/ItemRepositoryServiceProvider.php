<?php

namespace App\Providers;

use App\Repositories\Interfaces\ItemRepositoryInterface;
use App\Repositories\ItemRepository;
use Illuminate\Support\ServiceProvider;

class ItemRepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ItemRepositoryInterface::class, ItemRepository::class);
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
