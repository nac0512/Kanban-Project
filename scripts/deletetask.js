class DeleteTask {
    constructor(url, access) {
        this.url = url; 
        this.accessToken = access;
        document.querySelectorAll(".icon-delete").forEach(e => {
            e.addEventListener("click", (e)=>this.remove(e));
        });
    }

    remove(e) {
        let id = e.target.parentNode.getAttribute("data-id");

        let answer = document.createElement("dialog");
        answer.setAttribute("open", "");
        answer.setAttribute("aria-modal", "true");
        answer.innerHTML = `
        <h4 aria-live="assertive" role="alert">Warning!</h4>
        <p aria-live="polite" role="alert">You are about to delete the ${e.target.parentNode.querySelector(".task__title").innerHTML} task. Are you sure you want to continue?</p>
        <button id="noButton" type="button">No</button>
        <button id="yesButton" type="button">Yes</button>
        `;
        document.querySelector("footer").before(answer);

        Utilities.Focus();

        document.querySelector("dialog #noButton").focus();

        document.querySelector("dialog #yesButton").addEventListener("click", (e) => {
            document.querySelector("dialog").remove();

            Utilities.Unfocus();

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
                Utilities.FetchData(this.url, this.accessToken);
                setTimeout(() => {
                    Utilities.CreateAlert("success", `${responseAsText}.`);
                }, 200);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        });
        
        document.querySelector("dialog #noButton").addEventListener("click", function() {
            document.querySelector("dialog").remove();
            Utilities.Unfocus();
        });
    }
}