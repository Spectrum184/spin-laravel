const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputProNo = $("#form-add-location");
const btnDeleteLocation = $$(".btn-delete");
const btnConfirmDelete = $("#btnConfirmDelete");

const app = {
    // handle event of app
    handleEvent: function() {
        const _this = this;
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

        if (btnDeleteLocation) {
            this.bindActionForButton(btnDeleteLocation);
        }

        if (btnConfirmDelete) {
            btnConfirmDelete.onclick = function() {
                const id = $("#idProductLocation").innerText;
                const form = $("#form-" + id);

                form.submit();
            };
        }
    },

    bindActionForButton: function(listBtn) {
        listBtn.forEach(btn => {
            const id = btn.id;

            btn.onclick = function() {
                $("#idProductLocation").innerText = id;
            };
        });
    },

    start: function() {
        this.handleEvent();
    }
};

app.start();
