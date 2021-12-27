<?php

namespace App\Providers;

use App\Repositories\Interfaces\TransferMarketRepositoryInterface;
use App\Repositories\TransferMarketRepository;
use Illuminate\Support\ServiceProvider;

class TransferMarketRepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TransferMarketRepositoryInterface::class, TransferMarketRepository::class);
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
