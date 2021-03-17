@extends('layouts.manager')

@section('title', 'Mitsubishi Forecast')

@section('content')
<div class="row">
    <div class="col-3"></div>
    <div class="col-6 d-flex">
        <select id="select-division" class="custom-select">
            <option selected>Open this select menu</option>
            <option value="H1">製品/手溶接: H1</option>
            <option value="R1">製品/ロボット: R1</option>
            <option value="A1">製品/赤井: A1</option>
            <option value="IN1">製品/単体品: IN1</option>
            <option value="OUT1">製品/外注: OUT1</option>
            <option value="PK1">製品/圧入、組立: PK1</option>
            <option value="E1">製品/イーセル: E1</option>
            <option value="H2">部品/手溶接: H2</option>
            <option value="R2">部品/ロボット: R2</option>
            <option value="A2">部品/赤井: A2</option>
            <option value="IN2">部品/社内: IN2</option>
            <option value="OUT2">部品/外注: OUT2</option>
            <option value="MI2">部品/三春: MI2</option>
            <option value="E2">部品/イーセル: E2</option>
            <option value="S2">支給品: S2</option>
            <option value="不明品">不明品</option>
        </select>

        <button id="btn-load-data" class="ml-2 btn btn-primary">Load</button>
    </div>
    <div class="col-3"></div>
</div>

<script src="{{ asset('js/forecast.js') }}"></script>
@endsection
