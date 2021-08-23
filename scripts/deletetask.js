class DeleteTask {
    constructor(url, access) {
        this.url = url; 
        this.accessToken = access;
        document.querySelectorAll(".icon-delete").forEach(e => {
            e.addEventListener("click", (e)=>this.remove(e));
        });
    }

    remove(e) {
        let answer = confirm(`You are about to delete the ${e.target.parentNode.querySelector(".task__title").innerHTML} task. Click OK to continue or cancel to stop.`);
        if(answer) {
            let id = e.target.parentNode.getAttribute("data-id");

            fetch(`${this.url}/items/${id}${this.accessToken}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw response;
            })
            .then(responseAsText => {
                console.log('Successfully Deleted:', responseAsText);
                alert("Your task has been successfully deleted");
            })
            .then(() => {
                Utilities.FetchData(this.url, this.accessToken);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }
    }
}