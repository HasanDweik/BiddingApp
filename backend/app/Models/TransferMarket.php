<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransferMarket extends Model
{
    use HasFactory;

    protected $fillable = [
        'transfer_list_id', 'ending_date_time', 'buyout_price', 'starting_bid', 'current_bid', 'current_bidder_id', 'status'
    ];
}
