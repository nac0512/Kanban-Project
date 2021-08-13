class NewTask {
    constructor() {
        document.querySelector(".icon-add").addEventListener("click", e=>this.create(e));
        document.querySelector("button[type='submit']").addEventListener("click", e=>this.submit(e));
        document.querySelector("button[type='button']").addEventListener("click", e=>this.cancel(e));
    } 

    create(e) {
        document.querySelectorAll("section").forEach(e => {
            const option = document.createElement("option");
            option.value = e.getAttribute("id");
            option.text = e.firstChild.textContent;
            document.querySelector("select").appendChild(option);
        });

        document.querySelector("#container").style.filter= "blur(10px)";
        document.querySelector("form").style.display= "block";
    }

    submit(e) {
        e.preventDefault();

        let check = document.querySelector("form").reportValidity();

        if(check) {
            

        }
        else {
            throw "Fields mssing information";
        }
    }

    cancel(e) {
        document.querySelectorAll("option").forEach(e => {
            e.remove();
        })

        document.querySelector("form").reset();
        document.querySelector("#container").style.filter= "blur(0px)";
        document.querySelector("form").style.display = "none";
    }
}