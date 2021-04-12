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

    // initiate Model
    public function __construct(ProductProcess $productProcess, Calendar $calendar) {
        $this->productProcess = $productProcess;
        $this->calendar = $calendar;
    }

    //get production plan ID
    public function getCounter()
    {
        // fetch the plan counter inside the database
        $data = DB::table('plan_no_counter_table')->select('*')->get(); 

        //formating the counter into the appropriate form used in production plans
        $counter = $data[0]->Prod_Plan_No_CT.'';
        $counter = str_pad($counter,8,"0",STR_PAD_LEFT);

        return $counter;
    }

    // increase plan counter for later uses
    public function increaseCounter()
    {
        $affected = DB::table('plan_no_counter_table')->increment('Prod_Plan_No_CT');

        return $affected;
    }

    public function getPlan($ID)
        {
            $output = DB::table('productplan_table')->select('*')->where('Prod_Plan_No','=',$ID)->get();

            return [
                'Pro_No'=>$output->Prod_No,
                'Req_Due_Date'=>$output->Req_Due_Date,
                'Prod_Plan_Qty'=>$output->Prod_Plan_Qty
            ];
        }

    //read list of incomplete production plans of a product
    public function readPlan($productNo)
    {
        $data=DB::table('productplan_table')
            ->select('*')
            ->where([['Prod_No','=',$productNo],['Comp_FG','=',0]])->get();
        $altered=collect($data)->map(function($item){
            return [
                'Prod_Plan_No'=>$item->Prod_Plan_No,
                'Req_Due_Date'=>substr($item->Req_Due_Date,5),
                'Prod_Plan_Qty'=>$item->Prod_Plan_Qty,
                'Pro_No' => $item->Prod_No,
            ];
        });

        return $altered;
    }

    //create a new production plan
    public function createPlan($productNo, $quantity, $deadline)
    {
        $planNo = $this->increaseCounter();
        $planNo = str_pad(strval($this->getCounter()),8,'0');
        $timetmp=Carbon::parse($deadline);
        $timeArr= array();
        
        //return error upon choosing a holiday as the deadline
        if ($this->calendar->checkHoliday($timetmp)==1){
            return ["msg"=>'Error'];
        }
        //main 
        else{
            
            $now = Carbon::now()->format('Y-m-d');
            //insert production plan onto the general production plan table
            DB::table('productplan_table')->insert(
                [
                    'Prod_Plan_No'=>$planNo,
                    'Cust_CD'=>5001,
                    'Prod_No'=>$productNo,
                    'Prod_Plan_Qty'=>$quantity,
                    'Req_Due_Date'=>$timetmp,
                    'Entry_Date'=>$now,
                    'Comp_Qty'=>0,
                    'Comp_FG'=>0,
                ]
                );

            //calculations for the production plan's details 
            //calculate the deadline of each step according to designated deadline
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
            $timeArr=array_reverse($timeArr);
        
            //fetching product's process code 
            $processCode=$this->productProcess->getProcessCode($productNo);

            //inserting product's detailed production plan onto the detailed production plan table
            for ($i=1;$i<=$count;$i++){
                DB::table('productplan_details_table')
                    ->insert(
                    [
                        'Prod_Plan_No'=>$planNo,
                        'Seq_No'=>$i,
                        'Proc_CD'=>$processCode[$i-1],
                        'Prod_Plan_Qty'=>$quantity,
                        'Req_Due_Date'=>$timeArr[$i-1],
                    ]
                    );
                }
                return ["msg"=>'ok'];
        }
        
        
    }

    //modify an existing plan
    public function modifyPlan($ID, $day, $qty){
        $timetmp=Carbon::parse($day); 
        $quantity=(int)$qty;
        $modifyFlag=0;

        if ($this->calendar->checkHoliday($timetmp)==1){
            return ["msg"=>'error'];
        }
        else
        {
            $input = DB::table('productplan_table')
                    ->select('*')
                    ->where('Prod_Plan_No','=',$ID)
                    ->get();

            //modify both deadline and quantity 
            if ($input[0]->Req_Due_Date != $day){
                //changing product plan's deadline and quantity on the general production plan table
                DB::table('productplan_table')->where('Prod_Plan_No','=',$ID)->update(['Req_Due_Date'=>$timetmp,'Prod_Plan_Qty'=>$quantity]);

                //deleting associative plans on the detailed production plan table
                DB::table('productplan_details_table')->where('Prod_Plan_No','=',$ID)->delete();

                //re-calculating detailed production plan and inserting into said table
                $processTime = $this->productProcess->getProcessTime($input[0]->Prod_No);
                $timeArr=[];
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
                $timeArr=array_reverse($timeArr);
        
                $processCode=$this->productProcess->getProcessCode($input[0]->Prod_No);

                for ($i=1;$i<=$count;$i++){
                    DB::table('productplan_details_table')
                        ->insert(
                        [
                            'Prod_Plan_No'=>$ID,
                            'Seq_No'=>$i,
                            'Proc_CD'=>$processCode[$i-1],
                            'Prod_Plan_Qty'=>$quantity,
                            'Req_Due_Date'=>$timeArr[$i-1],
                        ]
                        );
                }
                $modifyFlag=1;
            }

            //modify quantity only
                if (($input[0]->Prod_Plan_Qty!=$qty)&&($modifyFlag==0)){
                DB::table('productplan_table')->where('Prod_Plan_No','=',$ID)->update(['Prod_Plan_Qty'=>$qty]);
                DB::table('productplan_details_table')->where('Prod_Plan_No','=',$ID)->update(['Prod_Plan_Qty'=>$qty]);
            }
            return ["msg"=> "OK"];
         }
        
    }

    //delete an existing plan
    public function deletePlan($ID)
    {
        DB::table('productplan_table')->where('Prod_Plan_No','=',$ID)->delete();
        DB::table('productplan_details_table')->where('Prod_Plan_No','=',$ID)->delete();

        return $ID;
    }
}
