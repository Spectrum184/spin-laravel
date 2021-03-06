const { data } = require("jquery");

window.axios = require("axios");
window.moment = require("moment");
require("chart.js");
const token = document.head.querySelector('meta[name="csrf-token"]');
window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnLoadData = $("#btn-load-data");
const selected = $("#select-division");
const productContent = $(".product-content");
const URL = "http://127.0.0.1:8000/api/";
const btnForecast = $("#btn-forecast"); 
const btnCreatePlan = $('#btn-create-plan');
const btnCancelPlan = $("#btn-cancel-plan");
const btnCancelEditPlan = $("#btn-hide-plan");
const modalEditPlan = $("#modalEditPlan");
const btnModifyPlan = $("#btn-edit-plan");
const loading = $("#loading");

let btnDeletePlan = null;
let listBtnEditPlan = null;

var arrChart = [];


const app = {
    data: [],
    // order data get from server
    orderData: [],
    //data day of chart
    dayData: [],
    sessionData: [],
    monthData: [],
    weekdays: [],
    holidayColor: [],
    timeData: null,
    // data list of chart
    // list button add product
    btnAddProd: [],
    forecastData: [],
    forecastDataResponse: [],
    //list btn show plan
    listBtnShowPlan: [],

    //compare to date
    compareDate: function(dateTimeA, dateTimeB) {
        let dateATmp = "";
        if (dateTimeA.length > 5) {
            dateATmp = dateTimeA.substring(dateTimeA.length - 5);
        } else {
            dateATmp = dateTimeA;
        }
        
        const momentA = moment(dateATmp, "MM-DD");
        const momentB = moment(dateTimeB, "MM/DD");
        if (momentA > momentB) return 1;
        else if (momentA < momentB) return -1;
        else return 0;
    },

    // init data for array session caculator
    getArrayDataSession: function() {
        const lengthArr = this.sessionData.length;
        const arrTmp = [];
        const lastDayOfMonth = moment()
            .add(1, "month")
            .endOf("month")
            .format("MM/DD");
        const month = moment()
            .add(1, "month")
            .format("MM");

        switch (lengthArr) {
            case 1:
                arrTmp.push(lastDayOfMonth);
                break;

            case 2:
                arrTmp.push(month + "/20", lastDayOfMonth);
                break;

            default:
                arrTmp.push(month + "/10", month + "/20", lastDayOfMonth);
                break;
        }
        return arrTmp;
    },

    //init data for chart
    initChartData: function(arrData) {
        const dataPro = arrData[0];
        const stock = Number(dataPro.Stock);
        const lengthOfDataDay = this.dayData.length;
        const arrayTmp = [];
        const arrDataChart = [];

        const arrSession = this.getArrayDataSession();
        const arrMonth = [];

        // data first of chart
        const dataNow = [];
        //data second of chart,

        const dataAfterProduct = [];

        let valueFirst1 = 0;
        let valueFirst2 = 0;
        let lengthOfDataTmp = 0;
        let index = 0;
        let indexTmp = 0;

        arrMonth.push(
            moment()
                .add(2, "M")
                .endOf("M")
                .format("MM/DD"),
            moment()
                .add(3, "M")
                .endOf("M")
                .format("MM/DD")
        );

        let arrTime = null;
        arrTime = this.dayData.concat(arrSession, arrMonth);

       //console.log(arrTime);

        // calculate first value of chart data
        arrData.forEach(data => {
            const dateTimeA = data.R_DUE_DATE;
            const dateTimeB = this.dayData[0];
            const value = this.compareDate(dateTimeA, dateTimeB);

            if (value != 1) {
                valueFirst1 -= Number(data.R_QTY);
                valueFirst2 += Number(data.P_QTY);
            } else {
                arrayTmp.push(data);
            }
        });

        valueFirst2 -= Math.abs(valueFirst1);
        valueFirst1 += stock;
        valueFirst2 += stock;

        lengthOfDataTmp = arrayTmp.length;

        for (index; index < lengthOfDataDay; index++) {
            for (let index1 = 0; index1 < lengthOfDataTmp; index1++) {
                if (
                    this.compareDate(
                        arrayTmp[index1].R_DUE_DATE,
                        this.dayData[index]
                    ) == 0
                ) {
                    valueFirst1 -= Number(arrayTmp[index1].R_QTY);
                    valueFirst2 =
                        valueFirst2 +
                        Number(arrayTmp[index1].P_QTY) -
                        Math.abs(Number(arrayTmp[index1].R_QTY));

                    break;
                }
            }

            dataNow[index] = valueFirst1;
            dataAfterProduct[index] = valueFirst2;
        }
        
        
        for (index; index < arrTime.length; index++) {
            for (let index1 = 0; index1 < lengthOfDataTmp; index1++) {
                if (
                    (this.compareDate(
                        arrayTmp[index1].R_DUE_DATE,
                        arrTime[index - 1]
                    ) == 1) &&
                    (this.compareDate(
                        arrayTmp[index1].R_DUE_DATE,
                        arrTime[index]
                    ) != 1)
                ) {
                    valueFirst1 -= Number(arrayTmp[index1].R_QTY);
                    valueFirst2 =
                        valueFirst2 +
                        Number(arrayTmp[index1].P_QTY) -
                        Math.abs(Number(arrayTmp[index1].R_QTY));
                    
                }
                
            }

            dataNow[index] = valueFirst1;
            dataAfterProduct[index] = valueFirst2;
        }
        
        arrDataChart.push(dataNow);
        arrDataChart.push(dataAfterProduct);

        return arrDataChart;
    },

    fillChartData: function(arrData) {},

    // get length for init dayData and for initSession
    getLengthOfDayData: function() {
        const session1 =
            moment()
                .add(1, "month")
                .format("MM") + "/01";

        const session2 =
            moment()
                .add(1, "month")
                .format("MM") + "/11";
        const session3 =
            moment()
                .add(1, "month")
                .format("MM") + "/21";

        const dayTmp = moment()
            .add(1, "month")
            .format("MM/DD");
        const sessionTmp = moment().format("YYYY") + "/";
        const arrayTmp = [];
        arrayTmp.push(session1, session2, session3);

        if (this.compareDate(dayTmp, session1) == -1) {
            arrayTmp.push(1);
            arrayTmp.push(
                moment(sessionTmp + session1, "YYYY/MM/DD").diff(
                    moment(),
                    "days"
                ) + 1
            );
            return arrayTmp;
        } else if (this.compareDate(dayTmp, session2) == -1) {
            arrayTmp.push(2);
            arrayTmp.push(
                moment(sessionTmp + session2, "YYYY/MM/DD").diff(
                    moment(),
                    "days"
                ) + 1
            );

            return arrayTmp;
        } else {
            arrayTmp.push(3);
            arrayTmp.push(
                moment(sessionTmp + session3, "YYYY/MM/DD").diff(
                    moment(),
                    "days"
                ) + 1
            );

            return arrayTmp;
        }
    },

    initSessionData: function() {
        const arrTmp = this.getLengthOfDayData();
        const key = arrTmp[3];

        switch (key) {
            case 1:
                this.sessionData.push(arrTmp[0], arrTmp[1], arrTmp[2]);
                break;
            case 2:
                this.sessionData.push(arrTmp[1], arrTmp[2]);
            default:
                this.sessionData.push(arrTmp[2]);
                break;
        }
    },

    initMonthData: function() {
        const twoMonthAfter =
            moment()
                .add(2, "month")
                .format("MM") + "/01";

        const threeMonthAfter =
            moment()
                .add(3, "month")
                .format("MM") + "/01";

        this.monthData.push(twoMonthAfter, threeMonthAfter);
    },

    // init data day of chart
    initDayData: function() {
        const arrTmp = this.getLengthOfDayData();
        const length = Number(arrTmp[4]);

        for (let index = 0; index < length; index++) {
            const day = moment()
                .add(index, "days")
                .format("MM/DD");
            const weekday = moment()
                .add(index, "days")
                .format('dddd');
            this.dayData.push(day);
            this.weekdays.push(weekday);
        }
    },

    initTimeData: function() {
        this.initDayData();
        this.initSessionData();
        this.initMonthData();

        this.timeData = this.dayData.concat(this.sessionData, this.monthData);
    },

    //generate holiday color array for chart drawing
    generateColorCode: function(weekdays, timeData){
        var tmparr=[];
        var tmp= null;
        for (let index = 0; index < weekdays.length; index++) {
            const element = weekdays[index];
            if ((element == 'Saturday')||(element == 'Sunday')){
                tmp = 'lightgrey';
            } else{
                tmp= 'white';
            }
            tmparr.push(tmp)
        }
        for (let index = weekdays.length; index < timeData.length; index++){
            tmp='#faebd7';
            tmparr.push(tmp)
        }
        return tmparr;
    },

    // load data of division
    loadData: async function(value) {
        try {
            const response = await axios.get(
                URL + "manager/mitsubishi-forecast?division=" + value
            );

            return response;
        } catch (error) {
            alert("Error: " + error.data);
        }
    },

    //read a singular product plan
    loadPlan: async function(ID){
        try{
            const response = await axios.get(
                URL + "manager/mitsubishi-forecast/get-plan?Id=" + ID
            );
            
            return response;
        } catch (error) {
            alert("Error: " + error.data);
        }
    },

    //read product plan of a singular item
    loadProductPlan: async function(value){
        try {
            const response = await axios.get(
                URL + "manager/mitsubishi-forecast/read-plan?product=" + value
            );
            
            return response;
        } catch (error) {
            alert("Error: " + error.data);
        }
    },

    // render chart
    render: async function() {
        const htmls = await this.orderData.map(data => {
            const dataPro = data[0];

            return `<div class=" row mt-2 no-gutters border" id="container-${dataPro.ORDER_Prod_No}">
            <div class="col-2 border-right">
                <div class="card border-0 w-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title border-bottom">????????????</h5>
                        <p class="card-text" style="font-weight: 700;">????????????: ${dataPro.ORDER_Prod_No}</p>
                        <p class="card-text">????????????: ${dataPro.Matl_Property}</p>
                        <p class="card-text">????????????: ${dataPro.Prod_Parts_Name} </p>
                        <p class="card-text">?????????: ${dataPro.Paint_CD1}</p>
                        <p class="card-text">??????2: ${dataPro.Paint_CD2}</p>
                        <p class="card-text">?????????X: ${dataPro.X_Elem_Size}</p>
                        <p class="card-text">?????????Y: ${dataPro.Y_Elem_Size}</p>
                        <p class="card-text">?????????Z: ${dataPro.Z_Elem_Size}</p>
                    </div>
                </div>
            </div>
            <div class="col-6 border-right">
                <div class="card border-0 w-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title border-bottom">?????????</h5>
                        <canvas class="w-100" id="canvas-${dataPro.ORDER_Prod_No}"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-2 border-right">
                <div class="card border-0 w-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title border-bottom">??????</h5>
                        <p class="card-text" style="border-bottom: 1px solid #E9E9E9;">????????????: ${dataPro.Stock}</p>
                        <p class="card-text">?????????: <span id="day-${dataPro.ORDER_Prod_No}"> </span></p>
                        <p class="card-text">?????????????????????: <span id="order-${dataPro.ORDER_Prod_No}"> </span></p>
                        <p class="card-text">??????????????????: <span id="product-${dataPro.ORDER_Prod_No}"> </span></p>
                        <h6 style="border-top: 1px solid #E9E9E9; padding: 4px 0 0 0;" class="d-flex justify-content-center" >????????????</h6>
                        <div class="mb-2 d-flex justify-content-center">
                            <button id="${dataPro.ORDER_Prod_No}" class="btn btn-primary btn-add-product">?????????</button>
                            <button id="show-${dataPro.ORDER_Prod_No}" class="ml-2 btn btn-primary btn-show-plan">Show</button>
                        </div>
                        <div id="list-plan-${dataPro.ORDER_Prod_No}"></div>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="card border-0 w-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title border-bottom">??????</h5>
                        <p class="card-text">???????????????????????????????????????????????????: <span id="recommend-day-${dataPro.ORDER_Prod_No}"></span></p>
                        <p class="card-text" style="border-bottom: 1px solid #E9E9E9;">??????????????????: <span id="recommend-qty-${dataPro.ORDER_Prod_No}"></span></p>
                        
                        <p class="card-text">???????????????:</p> 
                        <div id="recommend-component-${dataPro.ORDER_Prod_No}"></div>
                    </div>
                </div>
            </div>
        </div>`;
        });

        productContent.innerHTML = htmls.join("");
    },

    bindRecommendData: function(id, componentInfo, date, qty) {
        const recommendDate = $("#recommend-day-" + id);
        const recommendQty = $("#recommend-qty-" + id);
        const recommendComponent = $("#recommend-component-" + id);

        recommendDate.innerText = date;
        recommendQty.innerText = Math.abs(qty);
        recommendComponent.innerHTML = componentInfo;
    },

    // render recommendation
    renderRecommend: function(recommendData) {
        recommendData.forEach(data => {
            const id = data[0];
            const arrComponent = data[1];
            const date = data[2];
            const qty = Math.abs(data[3]);
            let componentInfo = "";

            if (arrComponent.length > 0) {
                arrComponent.forEach(component => {
                    componentInfo += `
                    <p>&#9711&nbsp&nbsp&nbsp????????????: ${component[0]}</p>
                    <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp????????????: ${Math.abs(component[3])}</p>
                    <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp??????: ${component[4]} </p>
                    `;
                });
            } else {
                componentInfo = `<p>????????????????????????????????????</p>`;
            }

            this.bindRecommendData(id, componentInfo, date, qty);
        });
    },

    // render plan
    renderPlan : async function(proNo){
        const showPlan = $("#list-plan-"+ proNo);
        let plan = "";
        const response = await this.loadProductPlan(proNo);
        const data = response.data;
       // console.log(data);
        
        if (data.length>0) {
            plan = data.map(d=>{
                return `
                    <div class="show-plan-${d.Prod_Plan_No} row no-gutters" id="plan-${d.Prod_Plan_No}">
                        <span id="plan-date-${d.Prod_Plan_No}" class="ml-1 col-4" style="font-size:0.8rem;">${d.Req_Due_Date}</span>
                        <span id="plan-qty-${d.Prod_Plan_No}" class="ml-1 col-3" style="font-size:0.8rem;">${d.Prod_Plan_Qty}</span>
                        <div class="edit-plan-icon"><span id="btn-edit-${d.Prod_Plan_No}" class="material-icons">edit</span></div>
                        <div class="delele-plan-icon"><span id="btn-delete-${d.Prod_Plan_No}" class="material-icons">delete</span></div>
                        <span id="plan-hide-${d.Pro_No}" class="plan-hide-${d.Prod_Plan_No}"></span>
                    </div>
                ` ;
             })

             showPlan.innerHTML = plan.join("");
        }else{
            showPlan.innerHTML = "<span>No plan</span>"
        }
    },

    // delete plan and update chart
    deletePlan: function(Id){
        const qty = $("#plan-qty-"+ Id).innerText;
        const date = $("#plan-date-" + Id).innerText;
        const prodNoTmp = $(".plan-hide-" + Id).id;
        const prodNo = prodNoTmp.substring(10);
        const day=date.replace('-','/');

        axios.post(URL + "manager/mitsubishi-forecast/delete-plan", {id: Id}).then(response=> console.log(response)).catch(err => console.log(err));

        console.log(day);
        this.updateChartPlus(prodNo, day, 0 - Number.parseInt(qty));
    },

    // handle event
    handleEvent: function() {
        const _this = this;
        
        
        btnLoadData.onclick = async function() {
            console.time(); 
            const selectedValue = selected.value;

            // load data from server
            loading.classList.remove("hide-modal");
            loading.classList.add("show-modal");
            const response = await _this.loadData(selectedValue);

            _this.orderData = response.data;
            //console.log(_this.orderData);

            //render data of the product
            await _this.render(_this.orderData);

            //render all chart
            _this.drawAllChart(_this.orderData);

            _this.btnAddProd = $$(".btn-add-product");
            _this.listBtnShowPlan = $$(".btn-show-plan");
            _this.bindActionForButton(_this.btnAddProd);

            await _this.bindActionBtnShow(_this.listBtnShowPlan);

            loading.classList.remove("show-modal");
            loading.classList.add("hide-modal");
            console.timeEnd();       
        };

        // forecast process
        btnForecast.onclick = async function() {
            loading.classList.remove("hide-modal");
            loading.classList.add("show-modal");
            const response = await _this.loadDataForecast(_this.forecastData);
            _this.forecastDataResponse = response.data;

            _this.renderRecommend(_this.forecastDataResponse);

            _this.forecastData = [];
            loading.classList.remove("show-modal");
            loading.classList.add("hide-modal");
        };

        // create plan process
        btnCreatePlan.onclick = async function () {
            const modal = $(".modal-container");
            let modalQuantity = $(".modal-container #input-qty");
            const datePlan = moment().format('YYYY') + '-' +$('#input-date').value;
            
            const productNumber = $('#addProductTitle').innerText;
            const quantity = $('#input-qty').value;
            modal.classList.remove('show-modal');
            modal.classList.add('hide-modal');
            modalQuantity='';
            let response = null;
            

            try {
                response = await axios.post(
                    URL + "manager/mitsubishi-forecast/create-plan",{
                        datePlan: datePlan,
                        productNumber: productNumber,
                        quantity: quantity 
                    }
                );
            } 
             catch (error) {
                alert("Error: " + error.data);
            }
            const day=$('#input-date').value.replace('-','/');
            const msg= response.data.counter.msg
            
            console.log(day)
            if (msg=="Error") {alert(msg);} 
            else{
                if (day.length ==5){_this.updateChartPlus(productNumber, day, response.data.quantity );}
                else{
                    day=day.substring(day.length-5);
                    _this.updateChartPlus(productNumber, day, response.data.quantity );
                }
            }
            
            
        };

        // hide modal create plan
        btnCancelPlan.onclick = function(){
            const quantity = $(".modal-container #input-qty");
            const modal = $(".modal-container");

            modal.classList.remove('show-modal');
            modal.classList.add('hide-modal');
            quantity.value= "";

        };

        btnCancelEditPlan.onclick = function(){
            modalEditPlan.classList.remove("show-modal-plan")
            modalEditPlan.classList.add("hide-modal-edit")
        }

        btnModifyPlan.onclick = async function(){
            const id = $("#editPlanTitle").innerText;
            const ProNoTmp = $(".plan-hide-"+id).id;
            const ProNo =ProNoTmp.substring(10);
            let dateTmp = $("#input-plan-date").value; 
            const date = moment().format("YYYY") + "-" + dateTmp;
            const qtyTmp = $("#input-plan-qty").value;
            const OdateTmp = $("#plan-date-"+id).innerHTML;
            const OqtyTmp = $("#plan-qty-" + id).innerHTML;
            const qty = Number.parseInt(qtyTmp);
            const Oqty= Number.parseInt(OqtyTmp);
            dateTmp=dateTmp.replace('-','/');
            const Odate=OdateTmp.replace('-','/');
            
            
            const result = await _this.modifyPlan(id, date, qty);
            
            if (result.data.msg=='error'){alert(result.data.msg);}
            else {
            _this.updateChartModify(ProNo,Odate,dateTmp,Oqty,qty);}
            modalEditPlan.classList.remove("show-modal-plan")
            modalEditPlan.classList.add("hide-modal-edit")
        }
    },

    updateChartPlus: function(productNumber, date, quantity){
        const qty = Number.parseInt(quantity);
        const chartdata=arrChart.filter(value=>value.id==productNumber);
        const chart=chartdata[0].chart;
        const dataAfterProd =  chart.data.datasets[1].data;
        const i = this.timeData.indexOf(date);
        for (let index = i; index < dataAfterProd.length; index++) {

        dataAfterProd[index] += qty;            
        }
        chart.data.datasets[1].data = dataAfterProd;

        chart.update();
    },

    updateChartModify: function(productNumber, originalDate, changedDate, originalQuantity, changedQuantity){
        const Oqty = Number.parseInt(originalQuantity);
        const Cqty = Number.parseInt(changedQuantity);
        const diffQty = Cqty-Oqty;
        const chartdata=arrChart.filter(value=>value.id==productNumber);
        const chart=chartdata[0].chart;
        const dataAfterProd =  chart.data.datasets[1].data;
        const i = this.timeData.indexOf(changedDate);
        const j = this.timeData.indexOf(originalDate);
       
        if (i<j){
            for (let index = i; index < j; index++) {
                dataAfterProd[index] += Cqty;
            }
            
            for (let index = j; index < dataAfterProd.length; index++) {
                 dataAfterProd[index] += diffQty;
            }
            }else if (i>j) {
                for (let index = j; index < i; index++) {
                    dataAfterProd[index] -= Oqty;
                }
                for (let index = i; index < dataAfterProd.length; index++) {
                     dataAfterProd[index] += diffQty;
                } 
            }else{
                console.log(dataAfterProd[i])
                for (let index = i; index < dataAfterProd.length; index++) {
                    dataAfterProd[index] += diffQty;
                    
                }
                
            }
            chart.data.datasets[1].data = dataAfterProd;

            chart.update();
        },

    loadDataForecast: async function(data) {
        try {
            const response = await axios.post(
                URL + "manager/mitsubishi-forecast/forecast",
                data
            );

            return response;
        } catch (error) {
            alert("Error: " + error.data);
        }
    },

    // bind action delete plan icon
    actionDeletePlan: function(listBtnDeletePlan){
        const _this = this;
        listBtnDeletePlan.forEach(element => {
            const id = element.id.substring(11);
            const plan = $("#plan-"+ id);

            element.onclick = function(){
                const input = _this.deletePlan(id);
                console.log(input);
                plan.classList.remove("show-plan");
                plan.classList.add("hide-plan");
        }
        });
    },

    //action modify plan
    modifyPlan: async function(id, date, qty){
        try {
            const response = await axios.post(
                URL + "manager/mitsubishi-forecast/modify-plan",
                {id: id, date: date, qty:qty }
            );

            return response;
        } catch (error) {
            alert("Error: " + error.data);
        }
        // axios.post(URL + "manager/mitsubishi-forecast/modify-plan", {id: id, date: date, qty:qty }).then(res=>console.log(res)).catch(err=>console.log(err))
    },

    //bind action edit plan
    actionEditPlan : function(listBtnEditPlan){
        const _this = this;
        const planTitle = $("#editPlanTitle");
        const planQty = $("#input-plan-qty");
        const planDate = $("#input-plan-date");

        listBtnEditPlan.forEach(element => {
            const id = element.id.substring(9);
            const date = $("#plan-date-"+id);
            const qty = $("#plan-qty-" + id);

            element.onclick = function(){
                modalEditPlan.classList.remove("hide-modal-edit");
                modalEditPlan.classList.add("show-modal-plan");
                planTitle.innerText = id;
                planQty.value = qty.innerText;
                planDate.value = date.innerText;
            }
        })
    },

    // bind action for list btn show plan
    bindActionBtnShow: async function(listBtnShow){
        const _this = this;
        listBtnShow.forEach(button=>{
            const id = button.id.substring(5);
            
            button.onclick = async function(){
                await _this.renderPlan(id);
                btnDeletePlan = $$('.delele-plan-icon .material-icons');
                listBtnEditPlan = $$(".edit-plan-icon .material-icons");
                console.log(listBtnEditPlan);
                _this.actionDeletePlan(btnDeletePlan);

                _this.actionEditPlan(listBtnEditPlan);
            }
        })
    },

    // bind action for button add product
    bindActionForButton: function(listButton) {
        listButton.forEach(button => {
            const id = button.id;
            const date = $("#day-" + id);
            const productQty = $("#product-" + id);
            const orderQty = $("#order-" + id);
            const modal = $(".modal-container");

            button.onclick = function() {
                $("#modalAddProduct #input-date").value = date.innerText;
                $("#modalAddProduct .order-qty").innerText = orderQty.innerText;
                $("#modalAddProduct .product-qty").innerText =
                    productQty.innerText;
                $("#modalAddProduct #addProductTitle").innerText = id;

                modal.classList.remove("hide-modal");
                modal.classList.add("show-modal");
            };
        });
    },

    drawAllChart: function(arrData) {
        arrChart.splice(0, arrChart.length);
        arrData.forEach(data => {
            const firstData = data[0];
            const firstDataOrderID = firstData.ORDER_Prod_No;
            const arrDataChart = this.initChartData(data);
            const dataNow = arrDataChart[0];
            const dataAfterProduct = arrDataChart[1];

            const chartName = this.drawChart(
                firstDataOrderID,
                this.timeData,
                dataNow,
                dataAfterProduct,
                firstDataOrderID
            );

            this.readChart(
                firstDataOrderID,
                chartName,
                firstDataOrderID,
                firstDataOrderID,
                firstDataOrderID
            );

            arrChart.push({
                chart: chartName,
                id: firstDataOrderID
            });
        });
    },
    // draw one chart
    drawChart: function(
        idChart,
        timeData,
        dataNow,
        dataAfterProduct,
        chartName
    ) {
        const ctx = document
            .getElementById("canvas-" + idChart)
            .getContext("2d");

        this.forecastData.push({
            Prod_No: chartName,
            qty: dataAfterProduct[this.timeData.length - 1 ],
            day: this.timeData[this.dayData.length - 1]
        });

        return (chartName = new Chart(ctx, {
            // The type of chart we want to create
            type: "line",

            // The data for our dataset
            data: {
                labels: timeData,
                datasets: [
                    {
                        label: "??????????????????",
                        fill: false,
                        borderColor: "red",
                        data: dataNow,
                        pointRadius: 1.5
                    },
                    {
                        label: "??????????????????",
                        fill: false,
                        borderColor: "green",
                        data: dataAfterProduct,
                        pointRadius: 1.5
                    }
                ]
            },
            options: {
                responsive: false,
                tooltips: {
                    mode: "index",
                    intersect: false
                },
                elements: {
                    line: {
                        tension: 0
                    }
                },
                scales: {
                    xAxes:[
                        {
                            type: 'category',
                            gridLines: {
                                drawOnChartArea: true,
                                
                                backgroundColorRepeat: false,
                                backgroundColor: this.holidayColor,
                            },
                            ticks:{
                                autoSkip: false,
                            }
                        }
                    ],
                    
                    yAxes: [
                        {
                            display: true,
                            type: 'linear',
                            gridLines: {
                                zeroLineColor: "black"
                            },
                            ticks: {
                                precision: 0,
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        }));
    },

    // binding action get data for chart
    readChart: function(chartId, chart, ID1, ID2, ID3) {
        const dayID = "#day-" + ID1;
        const orderID = "#order-" + ID2;
        const productID = "#product-" + ID3;
        $("#canvas-" + chartId).onclick = function(evt) {
            const activeX = chart.getElementsAtXAxis(evt);
            const clickedX = activeX[0]["_index"];
            const labelDay = chart.data.labels[clickedX];
            const valueOrder = chart.data.datasets[0].data[clickedX];
            const valueProduct = chart.data.datasets[1].data[clickedX];

            $(dayID).innerText = labelDay;
            $(orderID).innerText = valueOrder;
            $(productID).innerText = valueProduct;
        };
    },
    start: function() {
        this.handleEvent();

        this.initTimeData();

        this.holidayColor=this.generateColorCode(this.weekdays, this.timeData);
        // console.log(this.dayData)
        // console.log(this.timeData)
        

        //render chart
        this.render();
    }
};

app.start();
