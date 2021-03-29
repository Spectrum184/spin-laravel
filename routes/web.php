<?php

use App\Http\Controllers\ProductLocationController;
use App\Http\Controllers\HelloController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// product manager routes
Route::prefix('export')->group(function () {
    Route::get('/', 'HelloController@hello')->name('export');
    // route for locations control
    Route::get('locations/search', 'ProductLocationController@search')->name('locations.search');
    Route::get('/product_confirm', 'ProductConfirmController@index')->name('productConfirm.index');
    Route::resource('locations', 'ProductLocationController');
});

Route::prefix('manager')->group(function () {
    Route::get('/', 'HelloController@hello')->name('manager');
    // route to get forecast
    Route::get('/mitsubishi-forecast', 'ForecastController@index')->name('mftbc.forecast.index');
    // route for drawing search
    Route::get('drawing/search', 'DrawingController@findDrawing')->name('drawing.search');
    Route::get('drawing', 'DrawingController@index')->name('drawing.index');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
