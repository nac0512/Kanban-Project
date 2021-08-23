class NewTask {
    constructor(url, access) {
        this.url = url;
        this.accessToken = access;
        document.querySelector(".icon-add").addEventListener("click", e=>this.create(e));
    } 

    create(e) {
        Utilities.createForm(this.url, this.accessToken);
    }
}