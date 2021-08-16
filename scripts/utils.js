class Utilities {
    constructor() {

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
                    article.innerHTML =
                        `<h3>${responseAsJson[i].items[j].title}</h3>
                        <p>${responseAsJson[i].items[j].description}</p>
                        <time datetime="${responseAsJson[i].items[j].dueDate}">${responseAsJson[i].items[j].dueDate}</time>
                        <div class="edits">
                            <button class="icon-edit">Edit</button>
                            <button class="icon-delete">Delete</button>
                        </div>
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

    static createForm() {
        document.querySelectorAll("section").forEach(e => {
            const option = document.createElement("option");
            option.value = e.getAttribute("data-id");
            option.text = e.firstChild.textContent;
            document.querySelector("select").appendChild(option);
        });

        document.querySelectorAll(".container").forEach(e => {
            e.style.filter= "blur(10px)";
        });
        document.querySelector("form").style.display= "block";
    }
}