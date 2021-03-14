<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductLocation as RequestsProductLocation;
use App\ProductLocation;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class ProductLocationController extends Controller
{
    protected $productLocation;

    public function __construct(ProductLocation $productLocation)
    {
        $this->productLocation = $productLocation;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('exports.locations.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('exports.locations.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RequestsProductLocation $request)
    {
        $validated = $request->validate();
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function search(Request $request)
    {
        $pro_no = trim($request->get('pro_no'), " ");

        $locations = $this->productLocation->findByProNo($pro_no);

        return view('exports.locations.index', ['locations' => $locations]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProductLocation  $productLocation
     * @return \Illuminate\Http\Response
     */
    public function show(ProductLocation $productLocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProductLocation  $productLocation
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductLocation $productLocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductLocation  $productLocation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductLocation $productLocation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProductLocation  $productLocation
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductLocation $productLocation)
    {
        //
    }
}
