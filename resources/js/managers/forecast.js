window._ = require("lodash");
window.axios = require("axios");
window.m = require("moment");
window.chart = require("chart.js");

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    data: [],
    loadData: function() {
        async function getUser() {
            try {
                const response = await axios.get(
                    " http://127.0.0.1:8000/api/manager/mitsubishi-forecast"
                );
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
    },
    render: function() {},
    handleEvent: function() {
        const _this = this;
    },
    start: function() {
        this.loadData();
        this.handleEvent();
        this.render();
    }
};

app.start();
