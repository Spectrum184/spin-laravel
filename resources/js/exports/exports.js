const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputProNo = $("#form-add-location");

const app = {
    // handle event of app
    handleEvent: function() {
        // map enter key to tab key
        if (inputProNo) {
            inputProNo.onkeydown = function(event) {
                if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
                    var form = event.target.form;
                    var index = Array.prototype.indexOf.call(
                        form,
                        event.target
                    );
                    form.elements[index + 1].focus();
                    event.preventDefault();
                }
            };
        }
    },
    start: function() {
        this.handleEvent();
    }
};

app.start();
