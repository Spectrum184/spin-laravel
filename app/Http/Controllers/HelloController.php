<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    public function hello()
    {
        $url_tmp = url()->current();
        $url = substr($url_tmp, 22);
        return view('layouts.' . $url);
    }
}
