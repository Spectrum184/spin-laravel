<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Common extends Model
{
    private $err = "注文番号のフォーマットが間違っています！もう一同チェックしてお願いいたします。";

    public function formatOrderNumber($order_no_tmp, $customer_code)
    {
        $order_no = trim($order_no_tmp, " ");
        $strlenght = strlen($order_no);
        
        if ($customer_code == 5001) {
            if ($strlenght == 16) {
                if (strtoupper($order_no_tmp[0]) === 'A') {
                    $order_no = substr($order_no_tmp, 0, 8);
                } else if (strtoupper($order_no_tmp[0]) === 'B') {
                    $order_no = substr($order_no_tmp, 0, 7);
                } else {
                   return $this->err;
                }
            }else{
                return $this->err;
            }
        }else if ($customer_code == 5017) {
            if ($strlenght == 12) {
                $order_no = substr($order_no_tmp, 2, 8);
            } else {
                return $this->err;
            }
        }

        return $order_no;
    }
}
