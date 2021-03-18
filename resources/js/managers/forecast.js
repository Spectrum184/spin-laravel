window._ = require("lodash");
window.axios = require("axios");
window.m = require("moment");
window.chart = require("chart.js");

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnLoadData = $("#btn-load-data");
const selected = $("#select-division");
const URL = "http://127.0.0.1:8000/api/";

const dayData = [];
let orderData = null;

const app = {
    data: [],
    
    filterData : function(data){
        
    },

    // init data day of chart
    initDayData : function(){
        for (let index = 0; index < 31; index++) {
            const day = m()
                .add(index, "days")
                .format("MMDD");
            dayData.push(day);
        }
    },

    // load data of division
    loadData: async function(value) {
        try {
            const response = await axios.get(
                URL + "manager/mitsubishi-forecast?division=" + value
            );

            return response;
        } catch (error) {
            return error;
        }
    },
    // render chart
    render: function() {},

    // handle event
    handleEvent: function() {
        const _this = this;

        btnLoadData.onclick = async function() {
            const selectedValue = selected.value;
            _this.initDayData();

            const response = await _this.loadData(selectedValue);

            orderData = response.data;
            console.log(orderData)
        };
    },

    start: function() {
        this.handleEvent();

        //render chart
        this.render();
    }
};

app.start();
