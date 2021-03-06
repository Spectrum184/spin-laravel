@extends('layouts.manager')

@section('title', 'Mitsubishi Forecast')

@section('content')
<div class="row">
    <div class="col-3"></div>
    <div class="col-6 d-flex">
        <select id="select-division" class="custom-select">
            <option selected value="H1">製品/手溶接: H1</option>
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

       <div style="min-width: 200px">
        <button id="btn-load-data" class="ml-2 btn btn-primary">データ読み込み</button>
       </div>
    </div>
    <div class="col-3"></div>
</div>
<div class="row justify-content-center mt-3">
    <button style="min-width: 100px" id="btn-forecast" class="btn btn-primary">計算</button>
</div>
<div class="product-content"></div>

<!-- Modal -->
<div class="modal-container hide-modal">
    <div class="modal-create-plan" id="modalAddProduct">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">生産工程を加える: <span id="addProductTitle"></span>
                </h5>
            </div>
            <div class="modal-body">
                <div class="d-flex mb-3">
                    <h5>注文数量: <span class="order-qty"></span></h5>
                    <h5 class="ml-5">加工数量: <span class="product-qty"></span></h5>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="plan-deadline-date">予定日にち</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Default"
                        aria-describedby="inputGroup-sizing-default" id="input-date">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend" id="plan-quantity">
                        <span class="input-group-text">数量</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Default"
                        aria-describedby="inputGroup-sizing-default" id="input-qty">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id='btn-cancel-plan'>閉じる</button>
                <button type="button" class="btn btn-primary" id="btn-create-plan">保存する</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Edit Plan -->
<div class="modal-container hide-modal-edit" id="modalEditPlan">
    <div class="modal-create-plan">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >生産工程を加える: <span id="editPlanTitle"></span>
                </h5>
            </div>
            <div class="modal-body">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">予定日にち</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Default"
                        aria-describedby="inputGroup-sizing-default" id="input-plan-date">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend" id="plan-quantity">
                        <span class="input-group-text">数量</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Default"
                        aria-describedby="inputGroup-sizing-default" id="input-plan-qty">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id='btn-hide-plan'>閉じる</button>
                <button type="button" class="btn btn-primary" id="btn-edit-plan">保存する</button>
            </div>
        </div>
    </div>
</div>
<div id="loading" class="hide-modal">
    <div class="position-fixed w-100 h-100 text-center loading" style="background: #0008; color:white; top: 0; left: 0; z-index: 10000" >
        <svg with="250" height="250" viewBox="0 0 40 50">
          <polygon
            stroke="#fff"
            strokeWidth="1"
            fill="none"
            points="20,1 40,40 1,40"
          />
          <text fill="#fff" x="5" y="47">
            Sonobese
          </text>
        </svg>
    </div>
</div>

<script src="{{ asset('js/forecast.js') }}"></script>
@endsection
