@extends('layouts.export')

@section('title', 'Create Location')

@section('content')
<div class="col-12 mb-3 d-flex justify-content-center">
    <h3>新しいロケーションを加える</h3>
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
        <table class="table table-bordered table-sm">
            <thead>
                <tr>
                    <th scope="col">製品番号</th>
                    <th scope="col">棟</th>
                    <th scope="col">階</th>
                    <th scope="col">列</th>
                    <th scope="col">番</th>
                    <th scope="col">段</th>
                    <th scope="col">数量</th>
                    <th scope="col">ノート</th>
                    <th scope="col">行動</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input value="{{old('Pro_No')}}" name="Pro_No" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Building_No')}}" name="Building_No" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Floor_No')}}" name="Floor_No" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Row_Locate')}}" name="Row_Locate" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('No_Locate')}}" name="No_Locate" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Shelf')}}" name="Shelf" type="text" class="form-control"
                            aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Qty')}}" name="Qty" type="text" class="form-control" aria-label="Default"
                            aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td>
                        <input value="{{old('Note')}}" name="Note" type="text" class="form-control" aria-label="Default"
                            aria-describedby="inputGroup-sizing-default">
                    </td>
                    <td style="width: 200px;">
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary">保存</button>
                            <a href="{{ route('locations.index') }}" class="btn btn-warning ml-2">戻る</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>
@endsection
