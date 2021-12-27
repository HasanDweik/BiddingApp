<?php

namespace App\Providers;

use App\Repositories\Interfaces\TransferTargetRepositoryInterface;
use App\Repositories\TransferTargetRepository;
use Illuminate\Support\ServiceProvider;

class TransferTargetRepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TransferTargetRepositoryInterface::class, TransferTargetRepository::class);
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
