class EditTask {
    constructor() {
        document.querySelectorAll(".icon-edit").forEach(e => {
            e.addEventListener("click", (e)=>this.reopenForm(e));
        })
    }

    reopenForm(e) {
        let target = e.target.parentNode.parentNode;
        Utilities.createForm();

        document.querySelector("#title").value = target.querySelector("h3").innerHTML;
        document.querySelector("#descrip").value = target.querySelector("p").innerHTML;
        document.querySelector("#date").value = target.querySelector("time").innerHTML;
        document.querySelectorAll("option").forEach(e => {
            if(target.parentNode.getAttribute("data-id") === e.value) {
                document.querySelector("select").selectedIndex = e.value-1;
            }
        });
        document.querySelector("form").setAttribute("taskID", target.getAttribute("data-id"));
    }
}