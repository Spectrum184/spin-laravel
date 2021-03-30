<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class ProductLocation extends Model
{
    protected $table = 'product_location';
    protected $connection = 'mysql';

    use Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'Pro_No', 'Building_No', 'Floor_No', 'Row_Locate', 'No_Locate', 'Shelf', 'Qty', 'Note',
    ];

    public function findByProNo($pro_no)
    {
        $locations = DB::table('product_location')->where('Pro_No', 'like', '%' . $pro_no . '%')->get();

        return $locations;
    }
    
    public function findLocationById($id)
    {
        $location = ProductLocation::find($id);

        return $location;
    }

    public function deleteLocation($id)
    {
        DB::table('product_location')->where('id', $id)->delete();
    }

    public function updateLocation($id, $location)
    {
        DB::table('product_location')->where('id', $id)->update([
            'Pro_No'=> $location['Pro_No'],
            'Building_No'=> $location['Building_No'], 
            'Floor_No'=> $location['Floor_No'], 
            'Row_Locate'=> $location['Row_Locate'], 
            'No_Locate'=> $location['No_Locate'], 
            'Shelf'=> $location['Shelf'], 
            'Note'=> $location['Note'], 
            'Qty'=> $location['Qty'],
        ]);

        return $location['Pro_No'];
    }

    public function createLocation($location)
    {       
        DB::table('product_location')->updateOrInsert([
            'Pro_No'=> $location['Pro_No'],
            'Building_No'=> $location['Building_No'], 
            'Floor_No'=> $location['Floor_No'], 
            'Row_Locate'=> $location['Row_Locate'], 
            'No_Locate'=> $location['No_Locate'], 
            'Shelf'=> $location['Shelf'], 
            'Note'=> $location['Note'], 
            'Qty'=> $location['Qty'], 
        ]);

        return $location['Pro_No'];
    }
}
