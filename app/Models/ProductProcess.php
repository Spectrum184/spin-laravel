<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProductProcess extends Model
{
    use Notifiable;
    protected $table = 'prod_process_master';
    protected $connection = 'mysql';

    public function getTimeProduct($pro_no)
    {
        $dayTmp = 0;
        $data = DB::table('prod_process_master')->select('L_Time')->where('Parts_No', '=', $pro_no)->get();

        // L_Time in database default is 0
        foreach ($data as $d) {
            $l_time = ((float)$d->L_Time) == 0 ? 3 : ((float)$d->L_Time);
            $dayTmp += $l_time;
        }

        return $dayTmp;
    }
}
