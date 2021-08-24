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
            `<h3 id="formName">Add New Task</h3>
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title">
            </div>
            <div>
                <label for="descrip">Description:</label>
                <textarea id="descrip" name="descrip" maxlength="200"></textarea>
            </div>
            <div>
                <label for="lists">List:</label>
                <select id="lists" name="lists"></select>
            </div>
            <div>
                <label for="date">Due Date:</label>
                <input type="date" id="date" name="date">
            </div>
            <div id="formButtons">
                <button type="submit">Submit</button>
                <button type="button">Cancel</button>
            </div>`;

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

    static CreateStation(src) {
        let audio = document.createElement("audio");
        audio.setAttribute("id", "music");
        audio.innerHTML = `<source src=${src}>`
        document.querySelector("header").appendChild(audio);
        document.querySelector("#musicBtn").setAttribute("class", "icon-stop");
        document.querySelector("#musicBtn").setAttribute("aria-label", "Stop Playing Music");
        let status = document.querySelector("#music").play();
        if (status !== undefined) {
            status.then(_ => {

            }).catch(error => {
                alert("Your browser settings do not allow autoplay. Please click the music button to start playing music.");
                document.querySelector("#musicBtn").setAttribute("class", "icon-play");
                document.querySelector("#musicBtn").setAttribute("aria-label", "Play Music");
                document.querySelector("#musicBtn").focus();
            })
        }
    }
}