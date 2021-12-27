<?php

namespace App\Providers;

use App\Repositories\Interfaces\TransferListRepositoryInterface;
use App\Repositories\TransferListRepository;
use Illuminate\Support\ServiceProvider;

class TransferListRepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TransferListRepositoryInterface::class, TransferListRepository::class);
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
