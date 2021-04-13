<?php

namespace App\Http\Controllers;

use App\Models\MachineOperation;
use Illuminate\Http\Request;

class MachineController extends Controller
{

    // 
    protected $machineOperation;

    //
    public function __construct(MachineOperation $machineOperation)
    {
        $this->machineOperation = $machineOperation;
    }

    public function getDepartmentOperations(Request $request)
    {
        $department = $request->get('department');

        $data = $this->machineOperation->findOperationsByDepartment($department);

        return response()->json($data);
    }
}
