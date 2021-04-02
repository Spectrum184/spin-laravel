<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class Calendar extends Model
{
    use Notifiable;
    protected $table = 'calendar_table';
    protected $connection = 'mysql';

    /**
     * check for holidays
     */
    public function checkWeekendDay($day)
    {
        $numDay = 0;
        $day_start = Carbon::now();
        $day_end = Carbon::now()->addDay($day);

        // get number of day is weekend
        $numDay = $day_start->diffInDaysFiltered(function (Carbon $date) {
            return $date->isWeekend();
        }, $day_end);

        return $numDay;
    }

    public function checkHoliday($day){
        $tmp=DB::table('calendar_table')
        ->select('Day_Off_FG')
        ->where('Key_Date',$day)
        ->get();

        $dayOff = $tmp[0]->Day_Off_FG;

        return $dayOff;
    }
}   
