<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductConfirm;

class ProductConfirmController extends Controller
{
    protected $productConfirm;

    public function __construct(ProductConfirm $productConfirm) {
        $this->productConfirm = $productConfirm;
    }

    public function index()
    {
        
    }
}
