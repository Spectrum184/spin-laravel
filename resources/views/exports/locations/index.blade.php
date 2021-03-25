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
</div>
<div class="row">
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
                <td>{{ $location->Pro_No }}</td>
                <td>{{ $location->Building_No }}</td>
                <td>{{ $location->Floor_No }}</td>
                <td>{{ $location->Row_Locate }}</td>
                <td>{{ $location->No_Locate }}</td>
                <td>{{ $location->Shelf }}</td>
                <td>{{ $location->Qty }}</td>
                <td>{{ $location->Note }}</td>
                <td>
                    <div class="d-flex">
                        <a class="btn btn-primary mr-2" href="{{ route('locations.edit', $location->id) }}">Edit</a>
                        <form id="form-{{ $location->id }}" method="POST"
                            action="{{route('locations.destroy', $location->id)}}">
                            @csrf
                            @method('DELETE')
                            <!-- Button trigger modal -->
                            <button id="{{ $location->id }}" type="button" class="btn btn-danger btn-delete"
                                data-toggle="modal" data-target="#exampleModal">
                                Delete
                            </button>
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
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title <span id="idProductLocation"></span></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Do you want to delete?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="btnConfirmDelete">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
