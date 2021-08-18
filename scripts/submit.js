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
        }
        else {
            throw "Fields mssing information";
        }

        Utilities.RemoveForm();
    }
}