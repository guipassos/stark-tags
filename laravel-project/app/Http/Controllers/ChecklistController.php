<?php

namespace App\Http\Controllers;

use App\Checklist;
use App\Http\Requests\ChecklistCheckinRequest;
use App\Http\Requests\ChecklistCheckoutRequest;
use App\Http\Transformers\ChecklistTransformer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ChecklistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ChecklistTransformer $transformer)
    {
        return fractal(Checklist::all(), new ChecklistTransformer())->respond();
    }

    /**
     * Store a resource in storage.
     *
     * @param ChecklistCheckinRequest $request
     * @param Checklist $checklist
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkin(ChecklistCheckinRequest $request, Checklist $checklist)
    {
        $checklist->visitor_id = $request->get('visitor_id', $checklist->visitor_id) ?? null;
        $checklist->room_id    = $request->get('room_id', $checklist->room_id) ?? null;

        $visitorInCheckin = Checklist::query()
            ->where('visitor_id', '=',$checklist->visitor_id)
            ->where('room_id', '=', $checklist->room_id)
            ->whereNull('checkout_at')
            ->count('id');

        $inVisitRoom = Checklist::query()
                            ->where('room_id', '=', $checklist->room_id)
                            ->whereNull('checkout_at')
                            ->count('id');


        if($visitorInCheckin > 0){
            return Response::json(['code'=>'visitor.already.checkin'], 400);
        }

        if($checklist->room->capacity <= $inVisitRoom){
            return Response::json(['code'=>'room.capacity'], 400);
        }

        $checklist->save();

        return fractal($checklist, new ChecklistTransformer())->respond();
    }

    /**
     * Store a resource in storage.
     *
     * @param ChecklistCheckoutRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkout(ChecklistCheckoutRequest $request)
    {
        $checklist = Checklist::query()
                    ->where('visitor_id','=', $request->get('visitor_id'))
                    ->whereNull('checkout_at')
                    ->get();

        $checklist->each(function($item) {
            $item->checkout_at = Carbon::now('UTC');
            $item->save();
        });

        return fractal($checklist, new ChecklistTransformer())->respond();
    }

    /**
     * Display the specified resource.
     *
     * @param Checklist $checklist
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Checklist $checklist)
    {
        return fractal($checklist, new ChecklistTransformer())->respond();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listInVisit()
    {
        return fractal(Checklist::whereNull('checkout_at')->get(), new ChecklistTransformer())->respond();
    }

}
