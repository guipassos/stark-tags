<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

#Route::middleware('auth:api')->get('/user', function (Request $request) {
#    return $request->user();
#});

Route::group([
    'prefix' => 'visitors',
], function () {
    Route::get('/', 'VisitorController@index');
    Route::post('/', 'VisitorController@store');

    Route::group([
        'prefix' => '{visitor}',
    ], function () {
        Route::post('/', 'VisitorController@store');
        Route::get('/', 'VisitorController@show');
        Route::delete('/', 'VisitorController@destroy');
    });
});

Route::group([
    'prefix' => 'rooms',
], function () {
    Route::get('/', 'RoomController@index');
    Route::post('/', 'RoomController@store');

    Route::group([
        'prefix' => '{room}',
    ], function () {
        Route::post('/', 'RoomController@store');
        Route::get('/', 'RoomController@show');
        Route::delete('/', 'RoomController@destroy');
    });
});

Route::group([
    'prefix' => 'checklist',
], function () {
    Route::get('/', 'ChecklistController@index');
    Route::get('/in-visit', 'ChecklistController@listInVisit');
    Route::get('/{checklist}', 'ChecklistController@show');

    Route::post('/checkin', 'ChecklistController@checkin');
    Route::post('/checkout', 'ChecklistController@checkout');
});

