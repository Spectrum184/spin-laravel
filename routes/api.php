<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('manager')->group(function () {
    // api get data for forecast
    Route::get('/mitsubishi-forecast', 'ForecastController@returnData');
    Route::get('/mitsubishi-forecast/get-plan', 'ForecastController@getPlan');
    Route::get('/mitsubishi-forecast/read-plan', 'ForecastController@readPlan');
    Route::post('/mitsubishi-forecast/forecast', 'ForecastController@returnForecastData');
    Route::post('/mitsubishi-forecast/create-plan', 'ForecastController@createPlan');
    Route::post('/mitsubishi-forecast/delete-plan', 'ForecastController@deletePlan');
    Route::post('/mitsubishi-forecast/modify-plan', 'ForecastController@modifyPlan');
});
