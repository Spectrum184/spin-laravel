<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_location', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('Pro_No', 25)->nullable(false);
            $table->unsignedInteger('Building_No')->nullable();
            $table->unsignedInteger('Floor_No')->nullable();
            $table->string('Row_Locate', 2)->nullable();
            $table->string('No_Locate', 2)->nullable();
            $table->unsignedInteger('Shelf')->nullable();
            $table->unsignedInteger('Qty')->nullable();
            $table->string('Note', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_location');
    }
}
