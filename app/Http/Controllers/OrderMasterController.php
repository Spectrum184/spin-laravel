<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderMaster;

class OrderMasterController extends Controller
{
    protected $orderMaster;

    public function __construct(OrderMaster $orderMaster) {
        $this->$orderMaster = $orderMaster;
    }

    public function productConfirm(){
        return view('exports.confirm');
    }
}   
