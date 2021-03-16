<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Forecast extends Model
{
    use Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'Prod_No', 'Prod_Name', 'Delv_Point', 'Fol_Proc', 'Fcst_Qty', 'Fcst_Delv', 'Fcst_Season', 'Order_Comfirm',
    ];

    public function loadData()
    {
        $data = DB::select('SELECT ORDER_Prod_No, t1.Req_Due_Date as R_DUE_DATE, R_QTY, Stock, P_QTY, ifnull(Product_div,0) as P_DIV, Prod_Parts_Name, Matl_Property, X_Elem_Size, Y_Elem_Size, Z_Elem_Size, Paint_CD1, Paint_CD2 FROM (SELECT rtrim(t_parts_productplan.Prod_No)
        as ORDER_Prod_No, sum(Req_Qty) as R_QTY,Req_Due_Date, Stock,Product_div, t_parts_productplan.Cust_CD AS CCD, Prod_Parts_Name, Paint_CD1,Paint_CD2, Matl_Property, X_Elem_Size, Y_Elem_Size, Z_Elem_Size
        FROM (spin.t_parts_productplan left join unitsinstock_table on t_parts_productplan.Prod_No=unitsinstock_table.Prod_No and t_parts_productplan.Cust_CD=unitsinstock_table.Cust_CD) left join product_parts_master on t_parts_productplan.Prod_No=product_parts_master.Prod_Parts_No and t_parts_productplan.Cust_CD=product_parts_master.Cust_CD
        left join material_master on product_parts_master.Matl_CD=material_master.Matl_CD GROUP BY ORDER_Prod_No, Req_Due_Date) t1 left join (select Cust_CD, Prod_No, Req_Due_Date, sum(Prod_Plan_Qty) as P_QTY from productplan_table where comp_FG=0 group by Cust_CD, Prod_No, Req_Due_Date) t2 on t1.CCD=t2.Cust_CD and t1.ORDER_Prod_No=t2.Prod_No and t1.Req_Due_Date=t2.Req_Due_Date
        Union SELECT ORDER_Prod_No, R_DUE_DATE, Req_Qty as R_QTY, Stock, P_QTY, ifnull(Product_div,0) as P_DIV, Prod_Parts_Name, Matl_Property, X_Elem_Size, Y_Elem_Size, Z_Elem_Size, Paint_CD1, Paint_CD2
        from (select productplan_table.Prod_No as ORDER_Prod_No, productplan_table.Req_Due_Date as R_DUE_DATE, Stock, sum(Prod_Plan_Qty) as P_QTY, Product_div, productplan_table.Cust_CD AS CCD, Prod_Parts_Name, Matl_Property, X_Elem_Size, Y_Elem_Size, Z_Elem_Size, Paint_CD1, Paint_CD2
        from (productplan_table left join unitsinstock_table on productplan_table.Prod_No=unitsinstock_table.Prod_No and productplan_table.Cust_CD=unitsinstock_table.Cust_CD)
        left join product_parts_master on productplan_table.Prod_No=product_parts_master.Prod_Parts_No and productplan_table.Cust_CD=product_parts_master.Cust_CD left join material_master on product_parts_master.Matl_CD=material_master.Matl_CD where productplan_table.Cust_CD="5001" and comp_FG=0
        group by productplan_table.Cust_CD, ORDER_Prod_No, R_DUE_DATE) t3 left join t_parts_productplan on t3.ORDER_Prod_No=t_parts_productplan.Prod_No and t3.CCD=t_parts_productplan.Cust_CD and t3.R_DUE_DATE=t_parts_productplan.Req_Due_Date where Req_Qty Is Null ORDER BY P_DIV, ORDER_Prod_No, R_DUE_DATE');

        return $data;
    }
}
