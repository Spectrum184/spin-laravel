<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProductProcess extends Model
{
    use Notifiable;
    protected $table = 'prod_process_master';

    public function getTimeProduct($pro_no, $date)
    {
        $dayTmp = 0;
        $data = DB::table('prod_process_master')->select('Proc_No', 'L_Time')->where('Parts_No', '=', $pro_no)->get();

        foreach ($data as $d) {
            $proc_no = $d->Proc_No;
            $l_time = ((float)$d->L_Time) == 0 ? 3 : ((float)$d->L_Time);
            $dayTmp += $proc_no * $l_time;
        }

        $numOfDay = Carbon::parse($date)->subDay($dayTmp)->format('m/d');

        return $numOfDay;
    }
}
