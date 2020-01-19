<?php


namespace App\Http\Transformers;

use App\Room;
use League\Fractal\TransformerAbstract;

class RoomTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $defaultIncludes = [];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [];


    /**
     * A Fractal transformer.
     *
     * @param Room $room
     * @return array
     */
    public function transform(Room $room)
    {
        return [
            'id'       => $room->id,
            'number'   => $room->number,
            'capacity' => $room->capacity,
            'floor'    => $room->floor,
            'in_visit' => $room->inVisit()
        ];
    }
}
