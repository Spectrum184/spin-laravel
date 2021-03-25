<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Drawing extends Model
{
    protected $table = 'drawing_master';
    protected $connection = 'mysql1';

    /**
     * find drawing by product number
     */
    public function findDrawingByProNo($pro_no)
    {
        $drawing = DB::connection('mysql1')->table('drawing_master')->select('*')
            ->where([['Title', 'like', '%' . $pro_no . '%'], ['Activate', '=', 'True']])
            ->orderBy('Title')->limit(100)->get();

        return $drawing;
    }
}
