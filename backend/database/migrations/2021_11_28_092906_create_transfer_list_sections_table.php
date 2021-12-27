<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTransferListSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transfer_list_sections', function (Blueprint $table) {
            $table->id();
            $table->string('name', 10);
        });

        DB::table('transfer_list_sections')->insert([
            [ 'id' => 1, 'name' => 'available'],
            [ 'id' => 2, 'name' => 'active'],
            [ 'id' => 3, 'name' => 'sold'],
            [ 'id' => 4, 'name' => 'unsold']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transfer_list_sections');
    }
}
