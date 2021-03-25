<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Drawing extends Model
{
    protected $table = 'drawing_master';
    protected $connection = 'mysql1';

    /**
     * find drawing by product number
     */
    public function findDrawingByProNo($pro_no)
    {
        
    }
}
