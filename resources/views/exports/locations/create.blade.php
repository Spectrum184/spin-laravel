@extends('layouts.export')

@section('title', 'Create Location')

@section('content')
<div class="col-12 mb-3 d-flex justify-content-center">
    <h3>Create Location</h3>
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
    <form id="form-add-location" action="{{ route('locations.store') }}" method="POST">
        @csrf
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
                        <input value="{{old('pro_no')}}" name="pro_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('building_no')}}" name="building_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('floor_no')}}" name="floor_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('row_locate')}}" name="row_locate" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('no_locate')}}" name="no_locate" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('shelf')}}" name="shelf" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('qty')}}" name="qty" type="text" class="form-control" aria-label="Default"
                            aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('note')}}" name="note" type="text" class="form-control" aria-label="Default"
                            aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>
@endsection
