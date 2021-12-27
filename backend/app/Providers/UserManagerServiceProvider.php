<?php

namespace App\Providers;

use App\BusinessLogic\Interfaces\UserManagerInterface;
use App\BusinessLogic\UserManager;
use Illuminate\Support\ServiceProvider;

class UserManagerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserManagerInterface::class, UserManager::class);
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
