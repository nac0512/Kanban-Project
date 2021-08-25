class SubmitForm {
    constructor(url, access) {
        this.url = url;
        this.accessToken = access;
        document.querySelector("button[type='submit']").addEventListener("click", e=>this.submit(e));
    }

    submit(e) {
        e.preventDefault();
        let check = "true";
        let taskTitle = document.querySelector("#title").value;
        let taskDescrip = document.querySelector("#descrip").value;
        let taskDate= document.querySelector("#date").value;

        if(taskTitle == "" || taskDescrip == "" || taskDate == "") {
            check = "false";
        }

        if(check == "true") {
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
                    Utilities.CreateAlert("success", `The ${responseAsJson.title} task has been successfully updated.`);
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
                    Utilities.CreateAlert("success", `The ${responseAsJson.title} task has been successfully created.`);
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
            if(document.querySelector("#title").value == "") {
                if(!document.querySelector("#title").classList.contains("error")) {
                    document.querySelector("#title").setAttribute("class", "error");
                    let titleError = document.createElement("label");
                    titleError.setAttribute("id", "titleError");
                    titleError.setAttribute("class", "errorLabel");
                    titleError.setAttribute("aria-live", "polite");
                    titleError.innerHTML = "Please create a title for this task.";
                    document.querySelector("#title").after(titleError);
                }
            }
            else {
                if(document.querySelector("#title").classList.contains("error")) {
                    document.querySelector("#title").classList.remove("error");
                    document.querySelector("#titleError").remove();
                }

            }

            if(document.querySelector("#descrip").value == "") {
                if(!document.querySelector("#descrip").classList.contains("error")) {
                    document.querySelector("#descrip").setAttribute("class", "error");
                    let descripError = document.createElement("label");
                    descripError.setAttribute("id", "descripError");
                    descripError.setAttribute("class", "errorLabel");
                    descripError.setAttribute("aria-live", "polite");
                    descripError.innerHTML = "Please create a description for this task that is no more than 200 characters in length.";
                    document.querySelector("#descrip").after(descripError);
                }
            }
            else {
                if(document.querySelector("#descrip").classList.contains("error")) {
                    document.querySelector("#descrip").classList.remove("error");
                    document.querySelector("#descripError").remove();
                }

            }

            if(document.querySelector("#date").value == "") {
                if(!document.querySelector("#date").classList.contains("error")) {
                    document.querySelector("#date").setAttribute("class", "error");
                    let dateError = document.createElement("label");
                    dateError.setAttribute("id", "dateError");
                    dateError.setAttribute("class", "errorLabel");
                    dateError.setAttribute("aria-live", "polite");
                    dateError.innerHTML = "Please enter a complete MM/DD/YYYY date for this task.";
                    document.querySelector("#date").after(dateError);
                }
            }
            else {
                if(document.querySelector("#date").classList.contains("error")) {
                    document.querySelector("#date").classList.remove("error");
                    document.querySelector("#dateError").remove();
                }

            }

            document.querySelectorAll("input, textarea, select").forEach(e => {
                e.addEventListener("blur", function() {
                    if(e.classList.contains("error")) {
                        e.classList.remove("error");
                        e.nextSibling.remove();
                    }
                })
            })
        }
    }
}