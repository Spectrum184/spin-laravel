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

const app = {
    data: [],
    // order data get from server
    orderData: [],
    //data day of chart
    dayData: [],
    sessionData: [],
    monthData: [],
    timeData: null,
    // data list of chart
    arrChart: [],
    // list button add product
    btnAddProd: [],
    forecastData: [],
    forecastDataResponse: [],

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

        console.log(arrTime);

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
                    this.compareDate(
                        arrayTmp[index1].R_DUE_DATE,
                        arrTime[index - 1]
                    ) == 1 &&
                    this.compareDate(
                        arrayTmp[index1].R_DUE_DATE,
                        arrTime[index + 1]
                    ) == -1
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
            arrayTmp, push(2);
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
            this.dayData.push(day);
        }
    },

    initTimeData: function() {
        this.initDayData();
        this.initSessionData();
        this.initMonthData();

        this.timeData = this.dayData.concat(this.sessionData, this.monthData);
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
    // render chart
    render: async function() {
        const htmls = await this.orderData.map(data => {
            const dataPro = data[0];

            return `<div class=" row mt-2 no-gutters border">
            <div class="col-2 border-right">
                <div class="card border-0 w-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title border-bottom">Product Info</h5>
                        <p class="card-text">Matl_Property: ${dataPro.Matl_Property}</p>
                        <p class="card-text">ORDER_Prod_No: ${dataPro.ORDER_Prod_No}</p>
                        <p class="card-text">Prod_Parts_Name: ${dataPro.Prod_Parts_Name} </p>
                        <p class="card-text">塗装１: ${dataPro.Paint_CD1}</p>
                        <p class="card-text">塗装2: ${dataPro.Paint_CD2}</p>
                        <p class="card-text">X_Elem_Size: ${dataPro.X_Elem_Size}</p>
                        <p class="card-text">Y_Elem_Size: ${dataPro.Y_Elem_Size}</p>
                        <p class="card-text">Z_Elem_Size: ${dataPro.Z_Elem_Size}</p>
                    </div>
                </div>
            </div>
            <div class="col-6 border-right">
                <div class="card border-0 w-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title border-bottom">Chart</h5>
                        <canvas class="w-100" id="canvas-${dataPro.ORDER_Prod_No}"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-2 border-right">
                <div class="card border-0 w-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title border-bottom">Details</h5>
                        <p class="card-text">在庫: ${dataPro.Stock}</p>
                        <p class="card-text">日にち: <span id="day-${dataPro.ORDER_Prod_No}"> </span></p>
                        <p class="card-text">注文数量: <span id="order-${dataPro.ORDER_Prod_No}"> </span></p>
                        <p class="card-text">加工数量: <span id="product-${dataPro.ORDER_Prod_No}"> </span></p>
                        <div class="d-flex">
                            <button data-toggle="modal" data-target="#modalAddProduct" id="${dataPro.ORDER_Prod_No}" class="btn btn-primary btn-add-product">Add product</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="card border-0 w-100 h-100">
                    <div class="card-body">
                        <h5 class="card-title border-bottom">Recommendation</h5>
                        <p class="card-text" >進めの日にち: <span id="recommend-day-${dataPro.ORDER_Prod_No}"></span></p>
                        <p class="card-text">進めの加工数量: <span id="recommend-qty-${dataPro.ORDER_Prod_No}"></span></p>
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
                    <p>Product number: ${component[0]}</p>
                    <p>Quantity: ${Math.abs(component[3])}</p>
                    <p>Process name: ${component[4]} </p>
                    `;
                });
            } else {
                componentInfo = `<p>No component</p>`;
            }

            this.bindRecommendData(id, componentInfo, date, qty);
        });
    },

    // handle event
    handleEvent: function() {
        const _this = this;

        btnLoadData.onclick = async function() {
            const selectedValue = selected.value;

            // load data from server
            const response = await _this.loadData(selectedValue);

            _this.orderData = response.data;
            //console.log(_this.orderData);

            //render data of the product
            await _this.render(_this.orderData);

            //render all chart
            _this.drawAllChart(_this.orderData);

            _this.btnAddProd = $$(".btn-add-product");
            _this.bindActionForButton(_this.btnAddProd);
        };

        btnForecast.onclick = async function() {
            const response = await _this.loadDataForecast(_this.forecastData);
            _this.forecastDataResponse = response.data;

            _this.renderRecommend(_this.forecastDataResponse);

            _this.forecastData = [];
        };
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

    bindActionForButton: function(listButton) {
        listButton.forEach(button => {
            const id = button.id;
            const date = $("#day-" + id);
            const productQty = $("#product-" + id);
            const orderQty = $("#order-" + id);

            button.onclick = function() {
                $("#modalAddProduct #input-date").value = date.innerText;
                $("#modalAddProduct .order-qty").innerText = orderQty.innerText;
                $("#modalAddProduct .product-qty").innerText =
                    productQty.innerText;
                $("#modalAddProduct #addProductTitle").innerText = id;
            };
        });
    },

    drawAllChart: function(arrData) {
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

            this.arrChart.push(chartName);
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
            qty: dataNow[this.dayData.length],
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
                        label: "Now",
                        fill: false,
                        borderColor: "red",
                        data: dataNow,
                        pointRadius: 1.5
                    },
                    {
                        label: "After Product",
                        fill: false,
                        borderColor: "green",
                        data: dataAfterProduct,
                        pointRadius: 1.5
                    }
                ]
            },
            options: {
                responsive: true,
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
                    yAxes: [{}],
                    yAxes: [
                        {
                            display: true,
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

        //console.log(this.timeData);

        //render chart
        this.render();
    }
};

app.start();
