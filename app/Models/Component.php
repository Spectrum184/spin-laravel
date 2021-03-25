<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Component extends Model
{
    use Notifiable;
    protected $table = 'component_master';
    protected $productProcess;
    protected $connection = 'mysql';

    public function __construct(ProductProcess $productProcess)
    {
        $this->productProcess = $productProcess;
    }

    /**
     * find component for product
     */
    public function findComponent($Pro_No)
    {
        $_CUST_CD_MITSU = 5001;

        $sql = "SELECT Parts_Cust_CD,Parts_No,Prod_Parts_Name,Product_div,Used_Qty,stock,L_StkIn_Date,L_StkOut_Date,Abbre_Proc_Name
        FROM component_master left join product_parts_master on Cust_CD=Parts_Cust_CD and Prod_Parts_No=Parts_No
        LEFT JOIN process_master on process_master.Proc_CD = component_master.Used_Proc_CD
        left join unitsinstock_table on unitsinstock_table.Cust_CD=Parts_Cust_CD and Parts_No=Prod_No
        where Assy_Cust_CD='$_CUST_CD_MITSU' and Assy_No='$Pro_No'";

        $component = DB::select($sql);

        return $component;
    }

    /**
     * get data component for forecast
     */
    public function getDataComponent($Pro_No, $qty)
    {
        $arrTmp = array();

        $components = $this->findComponent($Pro_No);

        foreach ($components as $component) {
            $part_no = $component->Parts_No;
            $used_qty = $component->Used_Qty;
            $stock = $component->stock;
            $processName = $component->Abbre_Proc_Name;

            $tmp = $used_qty * $qty + $stock;
            if ($tmp < 0) {
                array_push($arrTmp, [$part_no, $used_qty, $stock, $tmp, $processName]);
            }
        }

        return $arrTmp;
    }

    /**
     * get component product time
     */
    public function getComponentTime($arrComponent)
    {
        $day = 0;
        $arrTime = array();

        foreach ($arrComponent as $component) {
            $tmp = 0;
            $part_no = $component[0];
            $date = Carbon::now();

            $tmp +=  $this->productProcess->getTimeProduct($part_no, $date);
            array_push($arrTime, $tmp);
        }

        $day = collect($arrTime)->max();

        return $day;
    }
}
