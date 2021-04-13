const { data } = require("jquery");

window.axios = require("axios");
window.moment = require("moment");
require("chart.js");
const token = document.head.querySelector('meta[name="csrf-token"]');
window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const URL = "http://127.0.0.1:8000/api/";

const app = {
    
    test: async function(){
        try{
            const response = await axios.get(
                URL + "machine/machine-operation/get-department-data?department=" + 'RBT'
            );
            return response;
            
        } catch (error) {
            alert("Error: " + error.data);
        }
    },
    
    
    start: function(){
        test=this.test();
        console.log(test);
    }
}

app.start();