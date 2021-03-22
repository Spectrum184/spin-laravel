<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class ProductLocation extends Model
{
    protected $table = 'product_location';
    use Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'Pro_No', 'Building_No', 'Floor_No', 'Row_Locate', 'No_Locate', 'Shelf', 'Qty', 'Note',
    ];

    public function findByProNo($pro_no)
    {
        $pro_no_tmp = $pro_no;
        $locations = DB::table('product_location')->where('Pro_No', 'like', '%' . $pro_no_tmp . '%')->get();

        return $locations;
    }
}
