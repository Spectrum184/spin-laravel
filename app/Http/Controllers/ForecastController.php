<?php

namespace App\Http\Controllers;

use App\Models\Forecast;
use App\Models\ProductPlan;
use Illuminate\Http\Request;

class ForecastController extends Controller
{
    protected $forecast;
    protected $product;

    public function __construct(Forecast $forecast, ProductPlan $product)
    {
        $this->forecast = $forecast;
        $this->product = $product;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('managers.forecast');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function returnData(Request $request)
    {
        $division = $request->get('division');

        $data = $this->forecast->filterData($division);

        return response()->json($data);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function returnForecastData(Request $request)
    {
        $data = $request->all();

        $products = $this->forecast->forecastProduct($data);

        return response()->json($products);
    }

    public function getPlan(Request $request){
        $Id = $request->get('Id');

        $plan = $this->product->getPlan($Id);

        return response()->json($plan);
    }

    public function readPlan(Request $request)
    {
        $productNumber = $request->get("product");

        $output = $this->product->readPlan($productNumber);

        return response()->json($output);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function createPlan(Request $request)
    {
        $productNumber = $request->productNumber;
        $quantity = $request->quantity;
        $datePlan = $request->datePlan;
        $data=[$productNumber,$quantity,$datePlan];
        
        $counter = $this->forecast->createPlan($data);

        return response()->json($counter);
    }

    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function modifyPlan(Request $request)
    {
        $data = $request->all();
        $id = $data["id"];
        $date = $data["date"];
        $qty = $data["qty"];

        $data = $this->product->modifyPlan($id, $date, $qty);

        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function deletePlan(Request $request)
    {
        $id = $request->id;
        $data = $this->product->deletePlan($id);

        return response()->json($data);
    }

}
