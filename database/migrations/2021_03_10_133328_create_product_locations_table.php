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
        Schema::create('product_locations', function (Blueprint $table) {
            $table->id();
            $table->string('pro_no', 25)->nullable(false);
            $table->unsignedInteger('building_no')->nullable();
            $table->unsignedInteger('floor_no')->nullable();
            $table->string('row_locate', 2)->nullable();
            $table->string('no_locate', 2)->nullable();
            $table->unsignedInteger('shelf')->nullable();
            $table->unsignedInteger('qty')->nullable();
            $table->string('note', 50)->nullable();
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
        Schema::dropIfExists('product_locations');
    }
}
