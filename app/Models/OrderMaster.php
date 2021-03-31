<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderMaster extends Model
{
    protected $commmon;

    public function __construct(Common $commmon) {
        $this->$commmon = $commmon;
    }

    

    public function FunctionName()
    {
        # code...
    }
}
