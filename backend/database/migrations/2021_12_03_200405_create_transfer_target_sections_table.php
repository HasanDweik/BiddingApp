<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTransferTargetSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transfer_target_sections', function (Blueprint $table) {
            $table->id();
            $table->string('name', 10);
        });

        DB::table('transfer_target_sections')->insert([
            [ 'id' => 1, 'name' => 'bid'],
            [ 'id' => 2, 'name' => 'won'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transfer_target_sections');
    }
}
