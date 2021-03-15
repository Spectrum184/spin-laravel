@extends('layouts.export')

@section('title', 'Edit location')

@section('content')
<div class="col-12 mb-3 d-flex justify-content-center">
    <h3>Edit Location {{$location->pro_no}}</h3>
</div>
<div class="row">
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <form id="form-add-location" action="{{ route('locations.update', $location) }}" method="POST">
        @csrf
        @method('PATCH')
        <table class="table table-bordered">
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
                <tr>
                    <td>
                        <input readonly value="{{ $location->pro_no}}" name="pro_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{$location->building_no}}" name="building_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{$location->floor_no}}" name="floor_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{$location->row_locate}}" name="row_locate" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{$location->no_locate}}" name="no_locate" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{$location->shelf}}" name="shelf" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{$location->qty}}" name="qty" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{$location->note}}" name="note" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>
@endsection
