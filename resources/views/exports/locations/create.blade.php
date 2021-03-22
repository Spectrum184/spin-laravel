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
                        <input value="{{old('Pro_No')}}" name="pro_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Building_No')}}" name="building_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Floor_No')}}" name="floor_no" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Row_Locate')}}" name="row_locate" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('No_Locate')}}" name="no_locate" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Shelf')}}" name="shelf" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Qty')}}" name="qty" type="text" class="form-control" aria-label="Default"
                            aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Note')}}" name="note" type="text" class="form-control" aria-label="Default"
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
