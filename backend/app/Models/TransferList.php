<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransferList extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id', 'user_id', 'transfer_list_section_id'
    ];
}
