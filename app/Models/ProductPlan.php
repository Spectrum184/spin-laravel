<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class ProductPlan extends Model
{
    use Notifiable;
    protected $table = 'productplan_table';
    protected $connection = 'mysql';
    protected $productProcess;
    protected $calendar;

    public function __construct(ProductProcess $productProcess, Calendar $calendar) {
        $this->productProcess = $productProcess;
        $this->calendar = $calendar;
    }

    

    public function getCounter()
    {
        $data = DB::table('plan_no_counter_table')->select('*')->get();
        
        $counter = $data[0]->Prod_Plan_No_CT.'';
        $counter = str_pad($counter,8,"0",STR_PAD_LEFT);

        return $counter;
    }

    public function increaseCounter()
    {
        $affected = DB::table('plan_no_counter_table')->increment('Prod_Plan_No_CT');

        return $affected;
    }

    public function createPlan($productNo, $quantity, $deadline)
    {
        $planNo = $this->getCounter();
        $timetmp=Carbon::parse($deadline);
        $timeArr= array();
        

        if ($this->calendar->checkHoliday($timetmp)==1){
            return 'Error';
        }
        else{
            $now = Carbon::now()->format('Y-m-d');
            // DB::table('productplan_table')->insert(
            //     [
            //         'Prod_Plan_No'=>$planNo,
            //         'Cust_CD'=>5001,
            //         'Prod_No'=>$productNo,
            //         'Prod_Plan_Qty'=>$quantity,
            //         'Req_Due_Date'=>$deadline,
            //         'Entry_Date'=>$now
            //     ]
            //     );
            $processTime = $this->productProcess->getProcessTime($productNo);
            $count=count($processTime);
            for ($i=$count;$i>0;$i--){
                for ($j=0;$j<$processTime[$i-1];$j++){
                    do {
                    $timetmp=$timetmp->subDay();
                    }
                    while ($this->calendar->checkHoliday($timetmp)==1);
                }
                $daydata=$timetmp->format('Y-m-d');
                array_push($timeArr,$daydata);
            }
        }
        $processCode=$this->productProcess->getProcessCode($productNo);

        return $processCode;
    }
}
