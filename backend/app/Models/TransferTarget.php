<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransferTarget extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id', 'user_id', 'bid', 'transfer_target_section_id', 'transfer_market_id'
    ];
}
