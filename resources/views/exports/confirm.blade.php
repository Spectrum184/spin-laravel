@extends('layouts.export')

@section('title', "製品確認")

@section('content')
<div class="row">
    <div class="col-12 mb-3 d-flex justify-content-center">
        <h3>製品確認</h3>
    </div>
    <div class="col-4"></div>
    <div class="col-4">
        <form action="" method="GET">
            <div class="justify-content-center">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">得意先</label>
                    </div>
                    <select class="custom-select" id="inputGroupSelect01" name="customerId">
                      <option selected value="5001">三菱ふそう: 5001</option>
                      <option value="5017">日立建機: 5017</option>
                    </select>
                  </div>
                <div class="">
                    @component('components.search', ['title'=>'バーコード','nameInput'=>'oder_no'])
                @endcomponent
                </div>
            </div>
        </form>
    </div>
    <div class="col-4"></div>
</div>
@endsection