<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class machineOperation extends Model
{
    use Notifiable;
    protected $machine;

    public function __construct(machine $machine)
    {
        $this->machine=$machine;
    } 

    protected $fillable = [
        'Plan_Code', 'Product_Code', 'Machine_Code', 'Operator', 'Prepare_Time', 'Start_Time', 'End_Time', 'Required_Quantity', 'Produced_Quantity', 'Repaired_Quantity', 'Failed_Quantity'
    ];

    // input a machine operation into database

    public function inputOperation($planCode, $productCode, $machineCode, $operator, $prepTime, $begin, $end, $reqQty, $producedQty, $repairedQty, $failedQty)
    {
        DB::table('machine_operation_master')->insert(
            [
                'Plan_Code'         =>      $planCode,
                'Product_Code'      =>      $productCode,
                'Machine_Code'      =>      $machineCode,
                'Operator'          =>      $operator,
                'Prepare_Time'      =>      $prepTime,
                'Start_Time'        =>      $begin,
                'End_Time'          =>      $end,
                'Required_Quantity' =>      $reqQty,
                'Produced_Quantity' =>      $producedQty,
                'Repaired_Quantity' =>      $repairedQty,
                'Failed_Quantity'   =>      $failedQty

            ]
            );
        return [
            'InputMsg' => 'OK'
        ];
        
    }

    // filter machine operation by department
    public function findOperationsByDepartment($departmentCode)
    {
        $data = DB::table('machine_operation_master')
                ->leftJoin('machine_master', 'machine_operation_master.Machine_Code', '=', 'machine_master.Machine_Code')
                ->select('*')
                ->where('machine_master.Department_Code', '=', $departmentCode)
                ->get();
        return $data;             
    }
}
