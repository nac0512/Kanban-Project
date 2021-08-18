class CancelForm {
    constructor() {
        document.querySelector("button[type='button']").addEventListener("click", e=>this.cancel(e));
    }

    cancel(e) {
        Utilities.RemoveForm();
    }
}