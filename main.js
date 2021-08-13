class Main {
    constructor() {
        this.url = "https://steep-shell-shape.glitch.me/api"
        this.accessToken = "?accessToken=5b1064585f4ab8706d275f90"

        fetch(`${this.url}/lists/${this.accessToken}`, {method: "GET"})
        .then(response => response.json())
        .then(responseAsJson => {
            for (let i = 0; i < responseAsJson.length; i++) {
                const section = document.createElement("section");
                section.setAttribute("id", `${responseAsJson[i].id}`);
                section.innerHTML = `<h2>${responseAsJson[i].title}</h2>`;
                document.querySelector("main").appendChild(section);

                for (let j = 0; j < responseAsJson[i].items.length; j++) {
                    const article = document.createElement("article");
                    article.setAttribute("id", `${responseAsJson[i].items[j].id}`);
                    article.setAttribute("listID", `${responseAsJson[i].items[j].listId}`)
                    article.innerHTML = `<h3>${responseAsJson[i].items[j].title}</h3><p>${responseAsJson[i].items[j].description}</p><time>${responseAsJson[i].items[j].dueDate}</time><div><button class="icon-edit">Edit</button><button class="icon-delete">Delete</button></div>`;
                    document.querySelector(`section:nth-of-type(${i+1})`).appendChild(article);

                } 
            }
        })

        const add = new NewTask();
        const edit = new EditTask();
        const remove = new DeleteTask();
    }

    static getInstance() {
        if(!Main._instance) {
            Main._instance = new Main();
            return Main._instance;
        }
        else {
            throw "Main has already been instantiated";
        }
    }
}

(() => {
    const main = Main.getInstance();
})();