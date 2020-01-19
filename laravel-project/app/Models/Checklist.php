<?php

namespace App;

use App\Http\Transformers\ChecklistTransformer;
use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{

    public function visitor(){
        return $this->hasOne(Visitor::class, 'id', 'visitor_id');
    }

    public function room(){
        return $this->hasOne(Room::class, 'id', 'room_id');
    }
}
