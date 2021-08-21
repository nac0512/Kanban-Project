class SubmitForm {
    constructor(url, access) {
        this.url = url;
        this.accessToken = access;
        document.querySelector("button[type='submit']").addEventListener("click", e=>this.submit(e));
    }

    submit(e) {
        e.preventDefault();
        let check = document.querySelector("form").reportValidity();

        if(check) {
            if(document.querySelector("form").hasAttribute("taskID")) {
                let id = document.querySelector("form").getAttribute("taskID");
                const updatedData = {
                    title: document.querySelector("#title").value,
                    listId: document.querySelector("#lists").value,
                    description: document.querySelector("#descrip").value,
                    dueDate: document.querySelector("#date").value
                };

                fetch(`${this.url}/items/${id}${this.accessToken}`, {
                    method: "PUT", 
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(updatedData)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(responseAsJson => {
                    console.log('Successfully Updated:', responseAsJson);
                })
                .then(() => {
                    Utilities.FetchData(this.url, this.accessToken);
                })
                .catch((error) => {
                console.error('Error:', error);
                });
            }
            else {
                const data = {
                    title: document.querySelector("#title").value,
                    listId: document.querySelector("#lists").value,
                    description: document.querySelector("#descrip").value,
                    dueDate: document.querySelector("#date").value
                };
    
                fetch(`${this.url}/items${this.accessToken}`, {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(responseAsJson => {
                    console.log('Successfully Created:', responseAsJson);
                })
                .then(() => {
                    Utilities.FetchData(this.url, this.accessToken);
                })
                .catch((error) => {
                console.error('Error:', error);
                });
            }
            
            Utilities.RemoveForm();
        }
        else {
            // ********To display custom errors in javascript instead of HTML, comment out this code********
            
            document.querySelectorAll("input, textarea, select").forEach(e => {
                if(!e.validity.valid) {
                    e.setAttribute("class", "error");
                }
            });

            // ********To display custom errors in javascript instead of HTML, uncomment out this code********

            // if(!document.querySelector("#title").validity.valid) {
            //     document.querySelector("#title").setAttribute("class", "error");
            //     document.querySelector("#title").setAttribute("oninvalid", "setCustomValidity('Please enter a title for your task')");
            // }
            // else {
            //     document.querySelector("#title").setCustomValidity("");
            // }
            // if(!document.querySelector("#descrip").validity.valid) {
            //     document.querySelector("#descrip").setAttribute("class", "error");
            //     document.querySelector("#descrip").setCustomValidity("Please enter a description for your task with a max of 200 characters");
            // }
            // else {
            //     document.querySelector("#descrip").setCustomValidity("");
            // }
            // if(!document.querySelector("#lists").validity.valid) {
            //     document.querySelector("#lists").setAttribute("class", "error");
            //     document.querySelector("#lists").setCustomValidity("Please select a list for your task");
            // }
            // else {
            //     document.querySelector("#lists").setCustomValidity("");
            // }
            // if(!document.querySelector("#date").validity.valid) {
            //     document.querySelector("#date").setAttribute("class", "error");
            //     document.querySelector("#date").setCustomValidity("Please enter a due date for your task");
            // }
            // else {
            //     document.querySelector("#date").setCustomValidity("");
            // }

            // document.querySelectorAll("input, textarea, select").forEach(e => {
            //     e.setAttribute("oninput", "setCustomValidity('')");
            // });
        }
    }
}