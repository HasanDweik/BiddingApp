<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TransferMarketFixes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transfer_markets', function (Blueprint $table){
            $table->double('current_bid',9,2)->nullable();
            $table->foreignId('current_bidder_id')->nullable()->constrained('users')->nullOnDelete();
            $table->integer('status'); 
        });

        Schema::table('transfer_targets', function (Blueprint $table) {
            $table->foreignId('transfer_market_id')->nullable()->constrained('transfer_markets')->nullOnDelete();
        });

      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
