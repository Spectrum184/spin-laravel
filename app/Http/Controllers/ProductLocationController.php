<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductLocation as RequestsProductLocation;
use App\Models\ProductLocation;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class ProductLocationController extends Controller
{
    protected $productLocation;
    protected $connection = 'mysql';

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
        $location = $this->productLocation::create($request->all());
        return redirect('export/locations/search?pro_no=' . $location->pro_no)->with('message', 'Created location');
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
    public function edit($id)
    {
        $location = $this->productLocation->findLocationById($id);

        return view('exports.locations.edit', ['location' => $location]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductLocation  $productLocation
     * @return \Illuminate\Http\Response
     */
    public function update(RequestsProductLocation $request, $id)
    {
        $location = $request->all();
        $pro_no = $this->productLocation->findLocationById($id, $location);

        return redirect('export/locations/search?pro_no=' . $pro_no)->with('message', 'Updated location');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProductLocation  $productLocation
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $message = $this->productLocation->deleteLocation($id);

        return redirect('export/locations')->with('message', $message);
    }
}
