<?php


namespace App\Http\Transformers;

use App\Checklist;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

class ChecklistTransformer extends TransformerAbstract
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
     * @param Checklist $checklist
     * @return array
     */
    public function transform(Checklist $checklist)
    {
        return [
            'id'       => $checklist->id,
            'visitor'  => ($checklist->visitor) ? fractal($checklist->visitor, new VisitorTransformer)->toArray()['data'] : null,
            'room'     => ($checklist->room) ? fractal($checklist->room, new RoomTransformer)->toArray()['data'] : null,
            'checkin'  => $checklist->created_at,
            'checkout' => ($checklist->checkout_at) ? Carbon::parse($checklist->checkout_at) : null,
        ];
    }
}
