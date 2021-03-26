<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class ProductPlan extends Model
{
    use Notifiable;
    protected $table = 'productplan_table';
    protected $connection = 'mysql';

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
    }
}
