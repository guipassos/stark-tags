<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomRequest;
use App\Http\Transformers\RoomTransformer;
use App\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return fractal(Room::all(), new RoomTransformer())->respond();
    }

    /**
     * Store a resource in storage.
     *
     * @param StoreRoomRequest $request
     * @param Room $room
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreRoomRequest $request, Room $room)
    {
        $room->number   = $request->get('number', $room->number) ?? null;
        $room->capacity = $request->get('capacity', $room->capacity) ?? null;
        $room->floor    = $request->get('floor', $room->floor) ?? null;
        $room->save();

        return fractal($room, new RoomTransformer())->respond();
    }

    /**
     * Display the specified resource.
     *
     * @param Room $room
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Room $room)
    {
        return fractal($room, new RoomTransformer())->respond();
    }

    /**
     * Destroy the specified resource in storage.
     *
     * @param Room $room
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return fractal($room, new RoomTransformer())->respond();
    }
}
