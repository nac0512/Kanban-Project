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
        <h3 aria-live="assertive" role="alert">Warning!</h3>
        <p aria-live="polite" role="alert">You are about to delete the ${e.target.parentNode.querySelector(".task__title").innerHTML} task. Are you sure you want to continue?</p>
        <button id="noButton" type="button">No</button>
        <button id="yesButton" type="button">Yes</button>
        `;
        document.querySelector("footer").before(answer);

        document.querySelectorAll("header, main, footer").forEach(e => {
            e.setAttribute("class", "blur");
        });

        document.querySelectorAll("header *, main *, footer *").forEach(e => {
            e.setAttribute("aria-hidden", "true");
            e.setAttribute("tabindex", "-1");
        });

        document.querySelector("dialog #noButton").focus();

        document.querySelector("dialog #yesButton").addEventListener("click", (e) => {
            document.querySelector("dialog").remove();

            document.querySelectorAll("header, main, footer").forEach(e => {
                e.removeAttribute("class", "blur");
            });
    
            document.querySelectorAll("header *, main *, footer *").forEach(e => {
                e.removeAttribute("aria-hidden", "true");
                e.removeAttribute("tabindex", "-1");
            });

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
                Utilities.CreateAlert("success", `${responseAsText}.`);
            })
            .then(() => {
                Utilities.FetchData(this.url, this.accessToken);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        });
        
        document.querySelector("dialog #noButton").addEventListener("click", function() {
            document.querySelector("dialog").remove();

            document.querySelectorAll("header, main, footer").forEach(e => {
                e.removeAttribute("class", "blur");
            });
    
            document.querySelectorAll("header *, main *, footer *").forEach(e => {
                e.removeAttribute("aria-hidden", "true");
                e.removeAttribute("tabindex", "-1");
            });
        });
    }
}