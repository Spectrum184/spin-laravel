<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ProductPlanDetails extends Model
{
    use Notifiable;
    protected $table = 'productplan_details_table';
    protected $connection = 'mysql';
}
