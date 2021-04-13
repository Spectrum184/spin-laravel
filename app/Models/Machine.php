<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class machine extends Model
{
    use Notifiable;
    protected $department;

    protected $fillable=[
        'Machine_Code', 'Machine_Name', 'Department_Code', 'Brought_Date', 'Last_Maintenance', 'Planned_Maintenance'
    ];

    // construct machine model
    public function __construct(department $department)
    {
        $this->department=$department;
    }

    //input new machine information
    public function inputMachineInfo($machineCode, $machineName, $departmentCode, $broughtDate, $lastMaintenance, $plannedMaintenance){
        DB::table('machine_master')
            ->insert([
                'Machine_Code'          =>  $machineCode,
                'Machine_Name'          =>  $machineName,
                'Department_Code'       =>  $departmentCode,
                'Brought_Date'          =>  $broughtDate,
                'Last_Maintenance'      =>  $lastMaintenance,
                'Planned_Maintenance'   =>  $plannedMaintenance
            ]);
        return ['Inputmsg'  =>  'OK'];
    }

    //search a singular machine by machine code
    public function searchSingular($machineCode)
    {
        $output = DB::table('machine_master')->select('*')->where('Machine_Code','=', $machineCode)->get();
        return $output;
    }

    //search machines within a department
    public function searchDepartment($department)
    {

        $output = DB::table('machine_master')->select('*')->where('Department_Code','=',$department)->get();
        return $output;
    }
}
