class NewTask {
    constructor(url, access) {
        this.url = url;
        this.accessToken = access;
        document.querySelector(".icon-add").addEventListener("click", e=>this.create(e));
        document.querySelector("button[type='button']").addEventListener("click", e=>this.cancel(e));
    } 

    create(e) {
        Utilities.createForm();
    }

    cancel(e) {
        document.querySelectorAll("option").forEach(e => {
            e.remove();
        })
        document.querySelector("form").removeAttribute("taskID");
        document.querySelector("form").reset();
        document.querySelector("#container").style.filter= "blur(0px)";
        document.querySelector("form").style.display = "none";
    }
}