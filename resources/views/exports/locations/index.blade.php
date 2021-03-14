@extends('layouts.export')

@section('title', 'Location Manager')

@section('content')
@if(session('message'))
@component('components.alert', ['type'=>'success'])
<h5>{{session('message')}}</h5>
@endcomponent
@endif
<div class="row">
    <div class="col-12 mb-3 d-flex justify-content-center">
        <h3>Product Location Manager</h3>
    </div>
    <div class="col-4"></div>
    <div class="col-4">
        <form action="{{ route('locations.search') }}" method="GET" class="d-flex justify-content-center">
            @component('components.search', ['title'=>'Barcode','nameInput'=>'pro_no'])
            @endcomponent
        </form>
        <div class="d-flex justify-content-center mt-2">
            <a href="{{ route('locations.create') }}" class="btn btn-primary">Add Location</a>
        </div>
    </div>
    <div class="col-4"></div>
    @isset($locations)
    <table class="table table-bordered mt-3">
        <thead>
            <tr>
                <th scope="col">Pro No</th>
                <th scope="col">Building No</th>
                <th scope="col">Floor No</th>
                <th scope="col">Row</th>
                <th scope="col">No</th>
                <th scope="col">Shelf</th>
                <th scope="col">Quantity</th>
                <th scope="col">Note</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            @if ($locations->isNotEmpty())
            @foreach ($locations as $location)
            <tr>
                <td>{{ $location->pro_no }}</td>
                <td>{{ $location->building_no }}</td>
                <td>{{ $location->floor_no }}</td>
                <td>{{ $location->row_locate }}</td>
                <td>{{ $location->no_locate }}</td>
                <td>{{ $location->shelf }}</td>
                <td>{{ $location->qty }}</td>
                <td>{{ $location->note }}</td>
                <td>
                    <div class="d-flex">
                        <a class="btn btn-primary mr-2" href="{{ route('locations.edit', $location->id) }}">Edit</a>
                        <form method="POST" action="{{route('locations.destroy', $location->id)}}">
                            @csrf
                            @method('DELETE')
                            <a class="btn btn-danger">Delete</a>
                        </form>
                    </div>
                </td>
            </tr>
            @endforeach
            @else
            <tr>
                <th>No product location</th>
            </tr>
            @endif
        </tbody>
    </table>
    @endisset
</div>
@endsection
