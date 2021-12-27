<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferMarketTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transfer_markets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transfer_list_id')->constrained('transfer_lists')->cascadeOnDelete();
            $table->datetime('ending_date_time')->nullable(false);
            $table->double('buyout_price', 9,2)->nullable(false);
            $table->double('starting_bid', 9,2)->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transfer_market');
    }
}
