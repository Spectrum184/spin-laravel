<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

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
}
