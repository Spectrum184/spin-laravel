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

    public function getMaxProcess($pro_no)
    {
        $max = 0;
        $data = DB::table('prod_process_master')->select('Proc_No')->where('Parts_No', '=', $pro_no)->get();
        $max = $data->max();
        $processed = $max->Proc_No;
        return $processed;
    }

    public function getProcessTime($pro_no)
    {
        $tmpArr=[];
        $data = DB::table('prod_process_master')->select('L_Time')->where('Parts_No', '=', $pro_no)->get();

        // L_Time in database default is 0
        foreach ($data as $d) {
            $l_time = ((float)$d->L_Time) == 0 ? 3 : ((float)$d->L_Time);
            array_push($tmpArr,$l_time);
        } 

        return $tmpArr;
    }

    public function getProcessCode($pro_no)
    {
        $data = DB::table('prod_process_master')->select('Proc_CD')->where('Parts_No', '=', $pro_no)->get();
        $processed=array();
        for ($i=0;$i<count($data);$i++){
            array_push($processed,$data[$i]->Proc_CD);
        }
        return $processed;
    }
}
