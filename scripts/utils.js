class Utilities {
    constructor() {
        this.active;
    }

    static FetchData(url, access) {
        fetch(`${url}/lists${access}`, {method: "GET"})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(responseAsJson => {
            console.log('All Data Fetched:', responseAsJson);
            for (let i = 0; i < responseAsJson.length; i++) {
                const section = document.createElement("section");
                section.setAttribute("data-id", `${responseAsJson[i].id}`);
                section.setAttribute("aria-label", `${responseAsJson[i].title} Kanban Board`);
                section.innerHTML = `<h2>${responseAsJson[i].title}</h2>`;

                if(document.body.contains(document.querySelector(`section:nth-of-type(${i+1})`))) {
                    document.querySelector(`section:nth-of-type(${i+1})`).replaceWith(section);
                }
                else {
                    document.querySelector("main").appendChild(section);
                }

                for (let j = 0; j < responseAsJson[i].items.length; j++) {
                    const article = document.createElement("article");
                    article.setAttribute("data-id", responseAsJson[i].items[j].id);
                    article.setAttribute("class", "task");
                    article.setAttribute("aria-label", `${responseAsJson[i].items[j].title} Task`);
                    article.innerHTML =
                        `<h3 class="task__title">${responseAsJson[i].items[j].title}</h3>
                        <p>${responseAsJson[i].items[j].description}</p>
                        <time datetime="${responseAsJson[i].items[j].dueDate}">Due: ${responseAsJson[i].items[j].dueDate}</time>
                        <button class="icon-edit" aria-label="Edit ${responseAsJson[i].items[j].title} Task">Edit</button>
                        <button class="icon-delete" aria-label="Delete ${responseAsJson[i].items[j].title} Task">Delete</button>
                        `;
                    document.querySelector(`section:nth-of-type(${i+1})`).appendChild(article);
                } 
            }
        })
        .then(() => {
            const edit = new EditTask(url, access);
            const remove = new DeleteTask(url, access);
        })
        .catch((error) => {
            console.error('Error Fetching Data:', error);
        });
    }

    static createForm(url, access) {
        this.active = document.activeElement;
        const form = document.createElement("form");
        form.innerHTML =

            // ********To display custom errors in javascript instead of HTML, comment out this code********

            `<h3 id="formName">Add New Task</h3>
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" oninvalid="setCustomValidity('Please Enter A Title For This Task')" oninput="setCustomValidity('')" required>
            </div>
            <div>
                <label for="descrip">Description:</label>
                <textarea id="descrip" name="descrip" maxlength="200" oninvalid="setCustomValidity('Please Enter A Description For This Task With No More Than 200 Characters')" oninput="setCustomValidity('')" required></textarea>
            </div>
            <div>
                <label for="lists">List:</label>
                <select id="lists" name="lists" oninvalid="setCustomValidity('Please Select A List For This Task')" oninput="setCustomValidity('')" required></select>
            </div>
            <div>
                <label for="date">Due Date:</label>
                <input type="date" id="date" name="date" oninvalid="setCustomValidity('Please Enter A Due Date For This Task')" oninput="setCustomValidity('')" required>
            </div>
            <div id="formButtons">
                <button type="submit">Submit</button>
                <button type="button">Cancel</button>
            </div>`;

            // ********To display custom errors in javascript instead of HTML, uncomment out this code********

            // `<h3 id="formName">Add New Task</h3>
            // <div>
            //     <label for="title">Title:</label>
            //     <input type="text" id="title" name="title" oninvalid="setCustomValidity('Please Enter A Title For This Task')" required>
            // </div>
            // <div>
            //     <label for="descrip">Description:</label>
            //     <textarea id="descrip" name="descrip" maxlength="200" oninvalid="setCustomValidity('Please Enter A Description For This Task With No More Than 200 Characters')" required></textarea>
            // </div>
            // <div>
            //     <label for="lists">List:</label>
            //     <select id="lists" name="lists" oninvalid="setCustomValidity('Please Select A List For This Task')" required></select>
            // </div>
            // <div>
            //     <label for="date">Due Date:</label>
            //     <input type="date" id="date" name="date" oninvalid="setCustomValidity('Please Enter A Due Date For This Task')" required>
            // </div>
            // <div id="formButtons">
            //     <button type="submit">Submit</button>
            //     <button type="button">Cancel</button>
            // </div>`;

        document.querySelector("footer").before(form);
        form.setAttribute("action", "#URL");
        form.setAttribute("method", "POST");
        form.setAttribute("aria-modal", "true");
        form.setAttribute("role", "dialog");
        form.setAttribute("aria-labelledby", "formName");

        document.querySelectorAll("section").forEach(e => {
            const option = document.createElement("option");
            option.value = e.getAttribute("data-id");
            option.text = e.firstChild.textContent;
            document.querySelector("select").appendChild(option);
        });

        document.querySelectorAll("header, main, footer").forEach(e => {
            e.setAttribute("class", "blur");
        });

        document.querySelectorAll("header *, main *, footer *").forEach(e => {
            e.setAttribute("aria-hidden", "true");
            e.setAttribute("tabindex", "-1");
        });

        document.querySelector("#title").focus();

        const sub = new SubmitForm(url, access);
        const cancel = new CancelForm();
    }

    static RemoveForm() {
        this.active.focus();

        document.querySelector("form").remove();

        document.querySelectorAll("header, main, footer").forEach(e => {
            e.removeAttribute("class", "blur");
        });

        document.querySelectorAll("header *, main *, footer *").forEach(e => {
            e.removeAttribute("aria-hidden", "true");
            e.removeAttribute("tabindex", "-1");
        });
    }
}