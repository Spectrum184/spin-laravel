@extends('layouts.manager')
@section('title', 'Drawing Search')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12 mb-3 d-flex justify-content-center">
            <h3>Search Drawing</h3>
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            <form action="{{ route('drawing.search') }}" method="GET" class="d-flex justify-content-center">
                @component('components.search', ['title'=>'Barcode','nameInput'=>'pro_no'])
                @endcomponent
            </form>
        </div>
        <div class="col-4"></div>
    </div>
    @isset($drawing)
    <table class="table table-bordered mt-3">
        <thead>
            <tr>
                <th scope="col">図面 ID</th>
                <th scope="col">図面番号</th>
                <th scope="col">名称</th>
                <th scope="col">設変</th>
                <th scope="col">得意先</th>
                <th scope="col">登録日</th>
                <th scope="col">更新日</th>
            </tr>
        </thead>
        <tbody>
            @if ($drawing->isNotEmpty())
            @foreach ($drawing as $item)
            <tr>
                <td>
                    <a href="{{ $path . $item->FileName . "." . $item->Prefix }}" target="_blank">{{ $item->Id }}</a>
                </td>
                <td>{{ $item->Title }}</td>
                <td>{{ $item->ExtProdName }}</td>
                <td>{{ $item->ExtChgNo }}</td>
                <td>{{ $item->ExtCustCd }}</td>
                <td>{{ $item->AddDate }}</td>
                <td>{{ $item->UpdateDate }}</td>
            </tr>
            @endforeach
            @else
            <tr>
                <th>No drawing</th>
            </tr>
            @endif
        </tbody>
    </table>
    @endisset
</div>
@endsection
