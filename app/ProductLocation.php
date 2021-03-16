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
        'pro_no', 'building_no', 'floor_no', 'row_locate', 'no_locate', 'shelf', 'qty', 'note',
    ];

    public function findByProNo($pro_no)
    {
        $pro_no_tmp = $pro_no;
        $locations = DB::table('product_location')->where('pro_no', 'like', '%' . $pro_no_tmp . '%')->get();

        return $locations;
    }
}
