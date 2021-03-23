<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Component extends Model
{
    use Notifiable;
    protected $table = 'component_master';

    /**
     * find component for product
     */
    public function findComponent($Pro_No)
    {
        $_CUST_CD_MITSU = 5001;
        $sql = "SELECT Parts_Cust_CD,Parts_No,Prod_Parts_Name,Product_div,Used_Qty,stock,L_StkIn_Date,L_StkOut_Date FROM (component_master left join product_parts_master on Cust_CD=Parts_Cust_CD and Prod_Parts_No=Parts_No) left join unitsinstock_table on unitsinstock_table.Cust_CD=Parts_Cust_CD and Parts_No=Prod_No where Assy_Cust_CD='$_CUST_CD_MITSU' and Assy_No='$Pro_No'";

        $component = DB::select($sql);

        return $component;
    }

    /**
     * get data component for forecast
     */
    public function getDataComponent($Pro_No)
    {
        $arrData = array();
        $arrTmp = array();

        $components = $this->findComponent($Pro_No);

        foreach ($components as $component) {
            $part_no = $component['Parts_No'];
            $used_qty = $component['Used_Qty'];
            $stock = $component['stock'];
            array_push($arrTmp, [$part_no, $used_qty, $stock]);
            array_push($arrData, $arrTmp);
            array_pop($arrTmp);    
        }
        
        return $arrData;
    }
}
