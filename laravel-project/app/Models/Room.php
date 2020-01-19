<?php

namespace App;

use App\Http\Transformers\RoomTransformer;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public function inVisit(){
        return $this->belongsTo(Checklist::class, 'id', 'room_id')->whereNull('checkout_at')->count('id');
    }
}
