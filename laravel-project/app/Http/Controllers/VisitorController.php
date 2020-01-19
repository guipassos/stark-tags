<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitorRequest;
use App\Http\Transformers\VisitorTransformer;
use App\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class VisitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return fractal(Visitor::all(), new VisitorTransformer())->respond();
    }

    /**
     * Store a resource in storage.
     *
     * @param StoreVisitorRequest $request
     * @param Visitor $visitor
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreVisitorRequest $request, Visitor $visitor)
    {
        $visitor->name           = $request->get('name', $visitor->name) ?? null;
        $visitor->document       = $request->get('document', $visitor->document) ?? null;
        $visitor->date_of_birth  = $request->get('date_of_birth', $visitor->date_of_birth) ?? null;
        $visitor->email          = $request->get('email', $visitor->email) ?? null;
        $visitor->save();

        return fractal($visitor, new VisitorTransformer())->respond();
    }

    /**
     * Display the specified resource.
     *
     * @param Visitor $visitor
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Visitor $visitor)
    {
        return fractal($visitor, new VisitorTransformer())->respond();
    }

    /**
     * Destroy the specified resource in storage.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Visitor $visitor)
    {
        $visitor->delete();
        return fractal($visitor, new VisitorTransformer())->respond();
    }


}
