class DeleteTask {
    constructor(url, access) {
        this.url = url; 
        this.accessToken = access;
        document.querySelectorAll(".icon-delete").forEach(e => {
            e.addEventListener("click", (e)=>this.remove(e));
        });
    }

    remove(e) {
        let id = (e.target.parentNode.parentNode.getAttribute("id"));

        fetch(`${this.url}/items/${id}${this.accessToken}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
              },
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw response;
        })
        .then(responseAsText => {
        console.log('Success:', responseAsText);
        Utilities.FetchData(this.url, this.accessToken);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
}