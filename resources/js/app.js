require("./bootstrap");

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputSearchBar = $("#input-search-bar");

const app = {
    handleEvent: function(){
       
    },

    windowEvent:  function(){
        if (inputSearchBar) {
            window.onload = function(){
                inputSearchBar.focus();
            }
        }
    },

    start: function(){
        this.handleEvent();

        this.windowEvent();
    }
}

app.start();