class NewTask {
    constructor(url, access) {
        this.url = url;
        this.accessToken = access;
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
            const data = {
                title: document.querySelector("#title").value,
                listId: document.querySelector("#lists").value,
                description: document.querySelector("#descrip").value,
                dueDate: document.querySelector("#date").value,
            };

            fetch(`${this.url}/items${this.accessToken}`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(responseAsJson => {
            console.log('Success:', responseAsJson);
            Utilities.FetchData(this.url, this.accessToken);
            })
            .catch((error) => {
            console.error('Error:', error);
            });

            document.querySelector("form").reset();
            document.querySelector("#container").style.filter= "blur(0px)";
            document.querySelector("form").style.display = "none";
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