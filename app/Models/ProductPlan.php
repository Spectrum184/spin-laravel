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

    public function __construct(ProductProcess $productProcess) {
        $this->productProcess = $productProcess;
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
        $now = Carbon::now()->format('Y-m-d');
        // DB::table('productplan_table')->insert(
        //     [
        //         'Prod_Plan_No'=>$planNo,
        //         'Cust_CD'=>5001,
        //         'Prod_No'=>$productNo,
        //         'Prod_Plan_Qty'=>$quantity,
        //         'Req_Due_Date'=>$deadline,
        //         'Entry_Date'=>$now,
        //         'Comp_Qty'=>0,
        //         'Comp_Date'=>NULL,
        //         'Comp_FG'=>0
        //     ]
        //     );

        $max = $this->productProcess->getMaxProcess($productNo);
        $processTime = $this->productProcess->getProcessTime($productNo);
        return $max;
    }
}
